import dayjs from 'dayjs';
import { useMutation, useQuery } from 'react-query';
import {
	DATE_FORMAT,
	DEFAULT_PAGE,
	MAX_PAGE_SIZE,
	transactionStatuses,
} from '../globals';
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

// Folder names land on disk as-is, so a branch machine's name has to be
// sanitized into something every OS accepts as a path segment first —
// strips/replaces characters invalid in Windows paths in particular.
const sanitizeFolderSegment = (value: string) =>
	value.replace(/[/\\:*?"<>|]/g, '_').trim();

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
	list: (
		params: Record<string, unknown>,
		baseURL?: string,
	) => Promise<ListResponseData<T>>,
	params: Record<string, unknown>,
	onPage?: (fetched: number, total: number) => void,
	baseURL?: string,
): Promise<T[]> => {
	let page = DEFAULT_PAGE;
	let results: T[] = [];

	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const response = await list(
			{ ...params, page, page_size: MAX_PAGE_SIZE },
			baseURL,
		);
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
// (a sequence of batch POSTs) are weighted into one combined 0-100 value so
// a single onProgress callback can drive a progress bar across both phases.
const FETCH_PHASE_WEIGHT = 30;
const WRITE_PHASE_WEIGHT = 100 - FETCH_PHASE_WEIGHT;

// Each bulk-export POST body carries the full text contents of every record
// in it, so a category with a production-sized history (tens of thousands
// of invoices) sent as one giant request risks browser/axios timeouts and
// backend payload-size limits. Splitting each category into bounded chunks
// keeps every request's body small regardless of total record count.
const BULK_EXPORT_CHUNK_SIZE = 200;

const chunkArray = <T>(items: T[], size: number): T[][] => {
	const chunks: T[][] = [];
	for (let i = 0; i < items.length; i += size) {
		chunks.push(items.slice(i, i + size));
	}
	return chunks;
};

export type BulkExportOnProgress = (percent: number) => void;

interface BulkExport {
	branchMachine: BranchMachine;
	siteSettings: SiteSettings;
	timeRange?: string;
	user: User;
	onProgress?: BulkExportOnProgress;
	// Any dayjs-parseable date. When given, the transactions/X-read/Z-read
	// fetches are scoped to [since, today] instead of the full history —
	// meant for a repeat/automated run that already has everything before
	// `since` exported, so it only re-fetches and re-writes what's new.
	// Omit for the default, exhaustive, complete-history export.
	since?: string;
	// Prefixes every folder_name below with the branch machine's own name.
	// Off by default, which keeps cashiering's export exactly as it's
	// always been: a cashiering terminal is the only machine writing to
	// its own local disk, so it has no need for a machine-name segment.
	// Backoffice opts in — a single backoffice instance's local API is
	// shared by every machine on that branch, so without this, exports
	// for different machines would land in the same invoices/reports
	// folders and could even overwrite each other (OR numbers are only
	// unique per machine, not per branch).
	groupByBranchMachine?: boolean;
	// Per-request baseURL overrides for a consumer with more than one API
	// base (e.g. a local-branch API for writes and a separate reports API
	// for reads). Both are optional and independent of each other; when
	// omitted, every call below falls through to axios.defaults.baseURL,
	// exactly as it already does — existing callers (ejjy-cashiering) don't
	// pass either and see no change in behavior.
	readBaseURL?: string;
	writeBaseURL?: string;
}

export const useBulkExport = () =>
	useMutation<Awaited<AxiosResponse<string>[]>, AxiosErrorResponse, BulkExport>(
		async ({
			branchMachine,
			siteSettings,
			user,
			onProgress,
			since,
			groupByBranchMachine,
			readBaseURL,
			writeBaseURL,
		}) => {
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

			// The e-journal export is exhaustive by default — meant to be
			// the complete historical record, so it does NOT scope these
			// fetches to any caller-supplied time range on its own
			// (`timeRange` is accepted on BulkExport only for backward
			// compatibility with existing callers and is otherwise ignored
			// here) — every transaction/xread/zread ever recorded is fetched
			// and grouped into its own month/day folder by the
			// invoice/report's own date. `since`, when given, is the one
			// opt-in exception: it narrows all 3 fetches to [since, today],
			// for a caller that already knows everything before `since` was
			// exported in a prior run.
			const sinceParams = since
				? {
						time_range: [
							dayjs.tz(since).format(DATE_FORMAT),
							dayjs.tz().format(DATE_FORMAT),
						].join(','),
					}
				: {};

			const [allTransactions, xreadReports, zreadReports] = await Promise.all([
				fetchAllPages<Transaction>(
					TransactionsService.list,
					{
						branch_machine_id: branchMachine.id,
						statuses: [
							transactionStatuses.FULLY_PAID,
							...VOID_STATUSES,
						].join(','),
						...sinceParams,
					},
					(fetched, total) => reportFetchProgress(0, fetched, total),
					readBaseURL,
				),
				// Deliberately omits is_with_daily_sales_data: the export
				// must include every X-read regardless of whether its daily
				// sales data has been generated/linked yet — passing `false`
				// here previously filtered the results down to only the
				// X-reads still missing daily sales data.
				fetchAllPages<XReadReport>(
					XReadReportsService.list,
					{
						branch_machine_id: branchMachine.id,
						...sinceParams,
					},
					(fetched, total) => reportFetchProgress(1, fetched, total),
					readBaseURL,
				),
				fetchAllPages<ZReadReport>(
					ZReadReportsService.list,
					{
						branch_machine_id: branchMachine.id,
						...sinceParams,
					},
					(fetched, total) => reportFetchProgress(2, fetched, total),
					readBaseURL,
				),
			]);

			// Pin the fetch phase to exactly FETCH_PHASE_WEIGHT once it's
			// done, in case a source ended up with 0 total records (whose
			// fraction never resolves to 1 above).
			onProgress?.(FETCH_PHASE_WEIGHT);

			// The invoices/ folder is the complete invoice record: every
			// transaction that has an invoice goes here, voided or not, each
			// rendered the standard way via createSalesInvoiceTxt (which
			// already appends the right footer for the transaction's own
			// status — "REPRINT ONLY" for a fully paid one, "VOIDED
			// TRANSACTION" for a void one). Voided transactions are not
			// excluded from this set — they're additionally collected below
			// into their own void/ folder alongside it.
			const salesTransactions = allTransactions.filter(
				(transaction) => transaction.invoice !== null,
			);
			const voidTransactions = allTransactions.filter((transaction) =>
				VOID_STATUSES.includes(transaction.status),
			);
			const voidTransactionsWithInvoice = voidTransactions.filter(
				(transaction) => transaction.invoice !== null,
			);

			// See groupByBranchMachine's doc comment on BulkExport: empty
			// (cashiering's existing, unprefixed layout) unless the caller
			// opts in.
			const machineFolder = groupByBranchMachine
				? `${sanitizeFolderSegment(branchMachine.name)}/`
				: '';

			// Each chunk is queued as a thunk (not yet invoked) so the export
			// requests can be run one at a time below, instead of firing all
			// of them at the local API concurrently — the concurrent version
			// was seen to intermittently drop/omit some batches' folders on
			// the first attempt. `recordCount` is carried alongside so the
			// write phase's share of onProgress can be split proportionally
			// across whichever chunks actually exist. Every category is
			// split into BULK_EXPORT_CHUNK_SIZE-record chunks (each becoming
			// its own request) rather than one POST per category, so a
			// production-sized history doesn't end up sent as a single huge
			// request body.
			const requests: {
				recordCount: number;
				run: (
					onUploadProgress?: AxiosRequestConfig['onUploadProgress'],
				) => Promise<AxiosResponse<string>>;
			}[] = [];
			const pushBulkExportRequests = <T>(
				records: T[],
				toData: (record: T) => BulkExportData,
			) => {
				chunkArray(records, BULK_EXPORT_CHUNK_SIZE).forEach((chunk) => {
					requests.push({
						recordCount: chunk.length,
						run: (onUploadProgress) =>
							ReportsService.bulkExportReports(
								{ data: chunk.map(toData) },
								onUploadProgress,
								writeBaseURL,
							),
					});
				});
			};

			if (salesTransactions.length > 0) {
				pushBulkExportRequests(salesTransactions, (transaction) => ({
					folder_name: `${machineFolder}invoices/${formatMonth(
						transaction.invoice.datetime_created,
					)}/${formatDateTime(transaction.invoice.datetime_created)}`,
					file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
					contents: createSalesInvoiceTxt(
						transaction,
						siteSettings,
						true,
						true,
					),
				}));
			}

			if (xreadReports.length > 0) {
				pushBulkExportRequests(xreadReports, (report) => ({
					folder_name: `${machineFolder}reports/xread/${formatMonth(
						report.generation_datetime,
					)}/${formatDateTime(report.generation_datetime)}`,
					file_name: `XReadReport_${formatDateTime(
						report.generation_datetime,
					)}_${report.id}.txt`,
					contents: createXReadTxt(report, siteSettings, user, true),
				}));
			}

			if (zreadReports.length > 0) {
				pushBulkExportRequests(zreadReports, (report) => ({
					folder_name: `${machineFolder}reports/zread/${formatMonth(
						report.generation_datetime,
					)}/${formatDateTime(report.generation_datetime)}`,
					file_name: `ZReadReport_${formatDateTime(
						report.generation_datetime,
					)}_${report.id}.txt`,
					contents: createZReadTxt(report, siteSettings, user, true),
				}));
			}

			// Voided Invoices: the full invoice content for each voided
			// transaction, reusing createSalesInvoiceTxt directly so the
			// "VOIDED TRANSACTION" footer (as opposed to "REPRINT ONLY") is
			// produced the same way it already is everywhere else. This
			// mirrors (does not replace) the copy of the same invoices that
			// also lands in invoices/ above. Lives under reports/, alongside
			// xread/zread, rather than as its own top-level folder.
			if (voidTransactionsWithInvoice.length > 0) {
				pushBulkExportRequests(voidTransactionsWithInvoice, (transaction) => ({
					folder_name: `${machineFolder}reports/void/${formatMonth(
						transaction.invoice.datetime_created,
					)}/${formatDateTime(transaction.invoice.datetime_created)}`,
					file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
					contents: createSalesInvoiceTxt(
						transaction,
						siteSettings,
						true,
						true,
					),
				}));
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
	baseURL?: string;
};

export const useGenerateReports = ({
	branchId,
	branchMachineId,
	userId,
	enabled,
	intervalMs,
	baseURL,
}: GenerateReports) =>
	useQuery(
		['useGenerateReports', branchId, branchMachineId],
		() =>
			wrapServiceWithCatch(
				ReportsService.generate(
					{
						branch_id: branchId,
						branch_machine_id: branchMachineId,
						user_id: userId,
					},
					baseURL,
				),
			),
		{
			enabled,
			refetchInterval: intervalMs,
			refetchIntervalInBackground: true,
			notifyOnChangeProps: [],
		},
	);
