import dayjs from 'dayjs';
import { useMutation, useQuery } from 'react-query';
import { DEFAULT_PAGE, MAX_PAGE_SIZE } from '../globals';
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
import { AxiosResponse } from 'axios';

const formatDateTime = (dateTime?: string): string => {
	return dayjs.tz(dateTime).format('MMDDYYYY');
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
			const params = {
				page_size: MAX_PAGE_SIZE,
				page: DEFAULT_PAGE,
				time_range: timeRange,
			};

			const [transactions, xreadReports, zreadReports] = await Promise.all<
				[
					PromiseLike<ListResponseData<Transaction>>,
					PromiseLike<ListResponseData<XReadReport>>,
					PromiseLike<ListResponseData<ZReadReport>>,
				]
			>([
				TransactionsService.list(params),
				XReadReportsService.list({
					...params,
					branch_machine_id: branchMachine.id,
					is_with_daily_sales_data: false,
				}),
				ZReadReportsService.list({
					...params,
					branch_machine_id: branchMachine.id,
				}),
			]);

			const requests = [];
			if (transactions.results.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: transactions.results
							.filter((transaction) => transaction.invoice !== null)
							.map((transaction) => ({
								folder_name: `invoices/${formatDateTime(
									transaction.invoice.datetime_created,
								)}/${transaction?.teller?.employee_id || 'NO_CASHIER'}`,
								file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
								contents: createSalesInvoiceTxt(
									transaction,
									siteSettings,
									branchMachine,
									true,
									true,
								),
							})),
					}),
				);
			}

			if (xreadReports.results.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: xreadReports.results.map((report) => ({
							folder_name: 'reports/xread',
							file_name: `XReadReport_${formatDateTime(
								report.generation_datetime,
							)}_${report.id}.txt`,
							contents: createXReadTxt(
								report,
								siteSettings,
								branchMachine,
								user,
								true,
							),
						})),
					}),
				);
			}

			if (zreadReports.results.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: zreadReports.results.map(
							(report): BulkExportData => ({
								folder_name: 'reports/zread',
								file_name: `ZReadReport_${formatDateTime(
									report.generation_datetime,
								)}_${report.id}.txt`,
								contents: createZReadTxt(
									report,
									siteSettings,
									branchMachine,
									user,
									true,
								),
							}),
						),
					}),
				);
			}

			return Promise.all(requests);
		},
	);

interface GenerateReports {
	enabled: boolean;
	intervalMs: number;
	branchId: number;
}

export const useGenerateReports = ({
	branchId,
	enabled,
	intervalMs,
}: GenerateReports) =>
	useQuery(
		['useGenerateReports', branchId],
		() =>
			wrapServiceWithCatch(
				ReportsService.generate({
					branch_id: Number(branchId),
				}),
			),
		{
			enabled: Number(branchId) > 0 && enabled,
			refetchInterval: intervalMs,
			refetchIntervalInBackground: true,
			notifyOnChangeProps: [],
		},
	);
