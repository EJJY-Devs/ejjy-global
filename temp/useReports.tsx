import dayjs from 'dayjs';
import {
	DEFAULT_PAGE,
	MAX_PAGE_SIZE,
	ZReadReport,
	createSalesInvoiceTxt,
	createXReadTxt,
	createZReadTxt,
} from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { useMutation, useQuery } from 'react-query';
import {
	ReportsService,
	TransactionsService,
	XReadReportsService,
	ZReadReportsService,
} from 'services';
import { BulkExportData } from 'services/ReportsService';
import { ListResponseData } from 'services/interfaces';
import { getBranchId, getBranchMachine } from 'utils';

const formatDateTime = (dateTime: string): string => {
	return dayjs.tz(dateTime).format('MMDDYYYY');
};

export const useBulkExport = () =>
	useMutation<any, any, any>(
		async ({ branchMachineId, siteSettings, timeRange, user }: any) => {
			const params = {
				page_size: MAX_PAGE_SIZE,
				page: DEFAULT_PAGE,
				time_range: timeRange,
			};

			const [transactions, xreadReports, zreadReports] = await Promise.all<
				[any, any, PromiseLike<ListResponseData<ZReadReport>>]
			>([
				TransactionsService.list(params),
				XReadReportsService.list({
					...params,
					branch_machine_id: branchMachineId,
					is_with_daily_sales_data: false,
				}),
				ZReadReportsService.list({
					...params,
					branch_machine_id: branchMachineId,
				}),
			]);

			const requests = [];
			if (transactions.data.results.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: transactions.data.results
							.filter((transaction) => transaction.invoice !== null)
							.map((transaction) => ({
								folder_name: `invoices/${formatDateTime(
									transaction.invoice.datetime_created,
								)}/${transaction?.teller?.employee_id || 'NO_CASHIER'}`,
								file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
								contents: createSalesInvoiceTxt(
									transaction,
									siteSettings,
									getBranchMachine(),
									true,
									true,
								),
							})),
					}),
				);
			}

			if (xreadReports.data.results.length > 0) {
				requests.push(
					ReportsService.bulkExportReports({
						data: xreadReports.data.results.map((report) => ({
							folder_name: 'reports/xread',
							file_name: `XReadReport_${formatDateTime(
								report.generation_datetime,
							)}_${report.id}.txt`,
							contents: createXReadTxt(
								report,
								siteSettings,
								user,
								getBranchMachine(),
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
									user,
									getBranchMachine(),
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

export const useGenerateReports = (enabled: boolean) => {
	const REFETCH_INTERVAL_MS = 20_000;
	const branchId = getBranchId();

	return useQuery(
		['useGenerateReports', branchId],
		() =>
			wrapServiceWithCatch(
				ReportsService.generate({
					branch_id: Number(branchId),
				}),
			),
		{
			enabled: Number(branchId) > 0 && enabled,
			refetchInterval: REFETCH_INTERVAL_MS,
			refetchIntervalInBackground: true,
			notifyOnChangeProps: [],
		},
	);
};
