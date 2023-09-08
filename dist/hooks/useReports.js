"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGenerateReports = exports.useBulkExport = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const utils_1 = require("utils");
const formatDateTime = (dateTime) => {
    return dayjs_1.default.tz(dateTime).format('MMDDYYYY');
};
const useBulkExport = () => (0, react_query_1.useMutation)(({ branchMachineId, siteSettings, timeRange, user }) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        page_size: ejjy_global_1.MAX_PAGE_SIZE,
        page: ejjy_global_1.DEFAULT_PAGE,
        time_range: timeRange,
    };
    const [transactions, xreadReports, zreadReports] = yield Promise.all([
        services_1.TransactionsService.list(params),
        services_1.XReadReportsService.list(Object.assign(Object.assign({}, params), { branch_machine_id: branchMachineId, is_with_daily_sales_data: false })),
        services_1.ZReadReportsService.list(Object.assign(Object.assign({}, params), { branch_machine_id: branchMachineId })),
    ]);
    const requests = [];
    if (transactions.data.results.length > 0) {
        requests.push(services_1.ReportsService.bulkExportReports({
            data: transactions.data.results
                .filter((transaction) => transaction.invoice !== null)
                .map((transaction) => {
                var _a;
                return ({
                    folder_name: `invoices/${formatDateTime(transaction.invoice.datetime_created)}/${((_a = transaction === null || transaction === void 0 ? void 0 : transaction.teller) === null || _a === void 0 ? void 0 : _a.employee_id) || 'NO_CASHIER'}`,
                    file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
                    contents: (0, ejjy_global_1.createSalesInvoiceTxt)(transaction, siteSettings, (0, utils_1.getBranchMachine)(), true, true),
                });
            }),
        }));
    }
    if (xreadReports.data.results.length > 0) {
        requests.push(services_1.ReportsService.bulkExportReports({
            data: xreadReports.data.results.map((report) => ({
                folder_name: 'reports/xread',
                file_name: `XReadReport_${formatDateTime(report.generation_datetime)}_${report.id}.txt`,
                contents: (0, ejjy_global_1.createXReadTxt)(report, siteSettings, user, (0, utils_1.getBranchMachine)(), true),
            })),
        }));
    }
    if (zreadReports.results.length > 0) {
        requests.push(services_1.ReportsService.bulkExportReports({
            data: zreadReports.results.map((report) => ({
                folder_name: 'reports/zread',
                file_name: `ZReadReport_${formatDateTime(report.generation_datetime)}_${report.id}.txt`,
                contents: (0, ejjy_global_1.createZReadTxt)(report, siteSettings, user, (0, utils_1.getBranchMachine)(), true),
            })),
        }));
    }
    return Promise.all(requests);
}));
exports.useBulkExport = useBulkExport;
const useGenerateReports = (enabled) => {
    const REFETCH_INTERVAL_MS = 20000;
    const branchId = (0, utils_1.getBranchId)();
    return (0, react_query_1.useQuery)(['useGenerateReports', branchId], () => (0, helper_1.wrapServiceWithCatch)(services_1.ReportsService.generate({
        branch_id: Number(branchId),
    })), {
        enabled: Number(branchId) > 0 && enabled,
        refetchInterval: REFETCH_INTERVAL_MS,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: [],
    });
};
exports.useGenerateReports = useGenerateReports;
