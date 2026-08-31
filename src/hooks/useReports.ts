import dayjs from 'dayjs';
import { useMutation, useQuery } from 'react-query';
import { DEFAULT_PAGE, MAX_PAGE_SIZE, transactionStatuses } from '../globals';
import { wrapServiceWithCatch } from '../hooks/helper';
import {
	createSalesInvoiceTxt,
	createVoidedTransactionsSummaryTxt,
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
import { AxiosResponse } from 'axios';

const formatDateTime = (dateTime?: string): string => {
	return dayjs.tz(dateTime).format('MMDDYYYY');
};

const VOID_STATUSES = [
	transactionStatuses.VOID_EDITED,
	transactionStatuses.VOID_CANCELLED,
];

// Loops through every page of a paginated list endpoint (driven by the
// response's `count`) so callers get the full result set for the time range
// instead of only the first MAX_PAGE_SIZE records.
const fetchAllPages = async <T>(
	list: (params: Record<string, unknown>) => Promise<ListResponseData<T>>,
	params: Record<string, unknown>,
): Promise<T[]> => {
	let page = DEFAULT_PAGE;
	let results: T[] = [];

	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const response = await list({ ...params, page, page_size: MAX_PAGE_SIZE });
		results = results.concat(response.results);

		if (results.length >= response.count || response.results.length === 0) {
			break;
		}

		page += 1;
	}

	return results;
};

interface BulkExport {
	branchMachine: BranchMachine;
	siteSettings: SiteSettings;
	timeRange?: string;
	user: User;
}

export const useBulkExport = () =>
	useMutation<Awaited<AxiosResponse<string>[]>, AxiosErrorResponse, BulkExport>(
		async ({ branchMachine, siteSettings, timeRange, user }) => {
			const params = { time_range: timeRange };

			const [allTransactions, xreadReports, zreadReports] = await Promise.all([
				fetchAllPages<Transaction>(TransactionsService.list, {
					...params,
					statuses: [
						transactionStatuses.FULLY_PAID,
						...VOID_STATUSES,
					].join(','),
				}),
				fetchAllPages<XReadReport>(XReadReportsService.list, {
					...params,
					branch_machine_id: branchMachine.id,
					is_with_daily_sales_data: false,
				}),
				fetchAllPages<ZReadReport>(ZReadReportsService.list, {
					...params,
					branch_machine_id: branchMachine.id,
				}),
			]);

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

			const requests = [];
			if (salesTransactions.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: salesTransactions.map((transaction) => ({
							folder_name: `invoices/${formatDateTime(
								transaction.invoice.datetime_created,
							)}/${transaction?.teller?.employee_id || 'NO_CASHIER'}`,
							file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
							contents: createSalesInvoiceTxt(
								transaction,
								siteSettings,
								true,
								true,
							),
						})),
					}),
				);
			}

			if (xreadReports.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: xreadReports.map((report) => ({
							folder_name: 'reports/xread',
							file_name: `XReadReport_${formatDateTime(
								report.generation_datetime,
							)}_${report.id}.txt`,
							contents: createXReadTxt(report, siteSettings, user, true),
						})),
					}),
				);
			}

			if (zreadReports.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: zreadReports.map(
							(report): BulkExportData => ({
								folder_name: 'reports/zread',
								file_name: `ZReadReport_${formatDateTime(
									report.generation_datetime,
								)}_${report.id}.txt`,
								contents: createZReadTxt(report, siteSettings, user, true),
							}),
						),
					}),
				);
			}

			// Voided Transactions: a single summary report listing every voided
			// transaction (OR number + amount) in the time range.
			if (voidTransactions.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: [
							{
								folder_name: 'reports/void',
								file_name: `VoidedTransactions_${formatDateTime(
									dayjs().toISOString(),
								)}.txt`,
								contents: createVoidedTransactionsSummaryTxt(
									voidTransactions,
									siteSettings,
									user,
									timeRange || '',
									true,
								),
							},
						],
					}),
				);
			}

			// Voided Invoices: the full invoice content for each voided
			// transaction, reusing createSalesInvoiceTxt directly so the
			// "VOIDED TRANSACTION" footer (as opposed to "REPRINT ONLY") is
			// produced the same way it already is everywhere else.
			if (voidTransactionsWithInvoice.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: voidTransactionsWithInvoice.map((transaction) => ({
							folder_name: `invoices/${formatDateTime(
								transaction.invoice.datetime_created,
							)}/${transaction?.teller?.employee_id || 'NO_CASHIER'}`,
							file_name: `Void_Sales_Invoice_${transaction.invoice.or_number}.txt`,
							contents: createSalesInvoiceTxt(
								transaction,
								siteSettings,
								true,
								true,
							),
						})),
					}),
				);
			}

			return Promise.all(requests);
		},
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
