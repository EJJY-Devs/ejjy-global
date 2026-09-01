import dayjs from 'dayjs';
import { useMutation, useQuery } from 'react-query';
import { DEFAULT_PAGE, MAX_PAGE_SIZE, transactionStatuses } from '../globals';
import { wrapServiceWithCatch } from '../hooks/helper';
import {
	createSalesInvoiceTxt,
	createXReadTxt,
	createZReadTxt,
} from '../print';
import {
	ReportsService,
	TransactionsService,
	XReadReportsService,
	ZReadReportsService,
} from '../services';
import { BulkExportData } from '../services/ReportsService';
import { AxiosErrorResponse, ListResponseData } from '../services/interfaces';
import {
	BranchMachine,
	SiteSettings,
	Transaction,
	User,
	XReadReport,
	ZReadReport,
} from '../types';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const formatDateTime = (dateTime?: string): string => {
	return dayjs.tz(dateTime).format('MMDDYYYY');
};

const formatMonth = (dateTime?: string): string => {
	return dayjs.tz(dateTime).format('MMYYYY');
};

const VOID_STATUSES = [
	transactionStatuses.VOID_EDITED,
	transactionStatuses.VOID_CANCELLED,
];

// Loops through every page of a paginated list endpoint (driven by the
// response's `count`) so callers get the full result set matching the given
// params instead of only the first MAX_PAGE_SIZE records. `onPage`, when
// given, is called after every page with the cumulative results fetched so
// far vs. the total the endpoint reports, so a caller can render progress.
const fetchAllPages = async <T>(
	list: (params: Record<string, unknown>) => Promise<ListResponseData<T>>,
	params: Record<string, unknown>,
	onPage?: (fetched: number, total: number) => void,
): Promise<T[]> => {
	let page = DEFAULT_PAGE;
	let results: T[] = [];

	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const response = await list({ ...params, page, page_size: MAX_PAGE_SIZE });
		results = results.concat(response.results);
		onPage?.(results.length, response.count);

		if (results.length >= response.count || response.results.length === 0) {
			break;
		}

		page += 1;
	}

	return results;
};

// The fetch phase (3 paginated reads, run concurrently) and the write phase
// (up to 4 sequential batch POSTs) are weighted into one combined 0-100
// value so a single onProgress callback can drive a progress bar across
// both phases.
const FETCH_PHASE_WEIGHT = 30;
const WRITE_PHASE_WEIGHT = 100 - FETCH_PHASE_WEIGHT;

export type BulkExportOnProgress = (percent: number) => void;

interface BulkExport {
	branchMachine: BranchMachine;
	siteSettings: SiteSettings;
	timeRange?: string;
	user: User;
	onProgress?: BulkExportOnProgress;
}

export const useBulkExport = () =>
	useMutation<Awaited<AxiosResponse<string>[]>, AxiosErrorResponse, BulkExport>(
		async ({ branchMachine, siteSettings, user, onProgress }) => {
			// Fetch phase: each of the 3 reads gets an equal share of
			// FETCH_PHASE_WEIGHT, filled in proportionally to how much of
			// that read's own pages have come back so far.
			const fetchWeight = FETCH_PHASE_WEIGHT / 3;
			const fetchProgress = [0, 0, 0];
			const reportFetchProgress = (
				index: number,
				fetched: number,
				total: number,
			) => {
				const fraction = total > 0 ? Math.min(fetched / total, 1) : 0;
				fetchProgress[index] = fraction * fetchWeight;
				onProgress?.(fetchProgress.reduce((sum, value) => sum + value, 0));
			};

			// The e-journal export must be exhaustive: it is meant to be the
			// complete historical record, so it intentionally does NOT scope
			// these fetches to any caller-supplied time range (`timeRange` is
			// accepted on BulkExport only for backward compatibility with
			// existing callers and is otherwise ignored here) — every
			// transaction/xread/zread ever recorded is fetched and grouped
			// into its own month/day folder by the invoice/report's own date.
			const [allTransactions, xreadReports, zreadReports] = await Promise.all([
				fetchAllPages<Transaction>(
					TransactionsService.list,
					{
						statuses: [
							transactionStatuses.FULLY_PAID,
							...VOID_STATUSES,
						].join(','),
					},
					(fetched, total) => reportFetchProgress(0, fetched, total),
				),
				fetchAllPages<XReadReport>(
					XReadReportsService.list,
					{
						branch_machine_id: branchMachine.id,
						is_with_daily_sales_data: false,
					},
					(fetched, total) => reportFetchProgress(1, fetched, total),
				),
				fetchAllPages<ZReadReport>(
					ZReadReportsService.list,
					{
						branch_machine_id: branchMachine.id,
					},
					(fetched, total) => reportFetchProgress(2, fetched, total),
				),
			]);

			// Pin the fetch phase to exactly FETCH_PHASE_WEIGHT once it's
			// done, in case a source ended up with 0 total records (whose
			// fraction never resolves to 1 above).
			onProgress?.(FETCH_PHASE_WEIGHT);

			const salesTransactions = allTransactions.filter(
				(transaction) =>
					transaction.invoice !== null &&
					!VOID_STATUSES.includes(transaction.status),
			);
			const voidTransactions = allTransactions.filter((transaction) =>
				VOID_STATUSES.includes(transaction.status),
			);
			const voidTransactionsWithInvoice = voidTransactions.filter(
				(transaction) => transaction.invoice !== null,
			);

			// Each batch is queued as a thunk (not yet invoked) so the export
			// requests can be run one at a time below, instead of firing all
			// of them at the local API concurrently — the concurrent version
			// was seen to intermittently drop/omit some batches' folders on
			// the first attempt. `recordCount` is carried alongside so the
			// write phase's share of onProgress can be split proportionally
			// across whichever batches actually exist.
			const requests: {
				recordCount: number;
				run: (
					onUploadProgress?: AxiosRequestConfig['onUploadProgress'],
				) => Promise<AxiosResponse<string>>;
			}[] = [];
			if (salesTransactions.length > 0) {
				requests.push({
					recordCount: salesTransactions.length,
					run: (onUploadProgress) =>
						ReportsService.bulkExportReports(
							{
								data: salesTransactions.map((transaction) => ({
									folder_name: `invoices/${formatMonth(
										transaction.invoice.datetime_created,
									)}/${formatDateTime(transaction.invoice.datetime_created)}`,
									file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
									contents: createSalesInvoiceTxt(
										transaction,
										siteSettings,
										true,
										true,
									),
								})),
							},
							onUploadProgress,
						),
				});
			}

			if (xreadReports.length > 0) {
				requests.push({
					recordCount: xreadReports.length,
					run: (onUploadProgress) =>
						ReportsService.bulkExportReports(
							{
								data: xreadReports.map((report) => ({
									folder_name: `reports/xread/${formatMonth(
										report.generation_datetime,
									)}/${formatDateTime(report.generation_datetime)}`,
									file_name: `XReadReport_${formatDateTime(
										report.generation_datetime,
									)}_${report.id}.txt`,
									contents: createXReadTxt(report, siteSettings, user, true),
								})),
							},
							onUploadProgress,
						),
				});
			}

			if (zreadReports.length > 0) {
				requests.push({
					recordCount: zreadReports.length,
					run: (onUploadProgress) =>
						ReportsService.bulkExportReports(
							{
								data: zreadReports.map(
									(report): BulkExportData => ({
										folder_name: `reports/zread/${formatMonth(
											report.generation_datetime,
										)}/${formatDateTime(report.generation_datetime)}`,
										file_name: `ZReadReport_${formatDateTime(
											report.generation_datetime,
										)}_${report.id}.txt`,
										contents: createZReadTxt(report, siteSettings, user, true),
									}),
								),
							},
							onUploadProgress,
						),
				});
			}

			// Voided Invoices: the full invoice content for each voided
			// transaction, reusing createSalesInvoiceTxt directly so the
			// "VOIDED TRANSACTION" footer (as opposed to "REPRINT ONLY") is
			// produced the same way it already is everywhere else. The void
			// folder exists purely to mirror the sales invoices of voided
			// transactions, so it uses the same file naming as a regular
			// sales invoice.
			if (voidTransactionsWithInvoice.length > 0) {
				requests.push({
					recordCount: voidTransactionsWithInvoice.length,
					run: (onUploadProgress) =>
						ReportsService.bulkExportReports(
							{
								data: voidTransactionsWithInvoice.map((transaction) => ({
									folder_name: `void/${formatMonth(
										transaction.invoice.datetime_created,
									)}/${formatDateTime(transaction.invoice.datetime_created)}`,
									file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
									contents: createSalesInvoiceTxt(
										transaction,
										siteSettings,
										true,
										true,
									),
								})),
							},
							onUploadProgress,
						),
				});
			}

			const totalRecords = requests.reduce(
				(sum, request) => sum + request.recordCount,
				0,
			);

			// Write phase: WRITE_PHASE_WEIGHT is split across the batches
			// that actually exist, proportionally to each batch's record
			// count, and within a batch the slice fills in as bytes are
			// sent (falling back to jumping straight to the full slice on
			// completion if the browser can't report byte progress).
			let writeProgress = 0;
			const responses: AxiosResponse<string>[] = [];
			// eslint-disable-next-line no-restricted-syntax
			for (const request of requests) {
				const batchWeight =
					totalRecords > 0
						? (request.recordCount / totalRecords) * WRITE_PHASE_WEIGHT
						: WRITE_PHASE_WEIGHT / requests.length;
				const batchStart = writeProgress;

				// eslint-disable-next-line no-await-in-loop
				const response = await request.run((event) => {
					const fraction =
						event.total > 0 ? Math.min(event.loaded / event.total, 1) : 0;
					onProgress?.(
						FETCH_PHASE_WEIGHT + batchStart + fraction * batchWeight,
					);
				});

				writeProgress = batchStart + batchWeight;
				onProgress?.(FETCH_PHASE_WEIGHT + writeProgress);
				responses.push(response);
			}

			onProgress?.(100);

			return responses;
		},
		{ mutationKey: ['bulkExportReports'] },
	);

type GenerateReports = {
	enabled: boolean;
	intervalMs: number;
	branchId?: number;
	branchMachineId?: number;
	userId?: number;
};

export const useGenerateReports = ({
	branchId,
	branchMachineId,
	userId,
	enabled,
	intervalMs,
}: GenerateReports) =>
	useQuery(
		['useGenerateReports', branchId, branchMachineId],
		() =>
			wrapServiceWithCatch(
				ReportsService.generate({
					branch_id: branchId,
					branch_machine_id: branchMachineId,
					user_id: userId,
				}),
			),
		{
			enabled,
			refetchInterval: intervalMs,
			refetchIntervalInBackground: true,
			notifyOnChangeProps: [],
		},
	);
