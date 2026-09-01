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
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const helper_1 = require("../hooks/helper");
const print_1 = require("../print");
const services_1 = require("../services");
const formatDateTime = (dateTime) => {
    return dayjs_1.default.tz(dateTime).format('MMDDYYYY');
};
const formatMonth = (dateTime) => {
    return dayjs_1.default.tz(dateTime).format('MMYYYY');
};
const VOID_STATUSES = [
    globals_1.transactionStatuses.VOID_EDITED,
    globals_1.transactionStatuses.VOID_CANCELLED,
];
// Loops through every page of a paginated list endpoint (driven by the
// response's `count`) so callers get the full result set for the time range
// instead of only the first MAX_PAGE_SIZE records.
const fetchAllPages = (list, params) => __awaiter(void 0, void 0, void 0, function* () {
    let page = globals_1.DEFAULT_PAGE;
    let results = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // eslint-disable-next-line no-await-in-loop
        const response = yield list(Object.assign(Object.assign({}, params), { page, page_size: globals_1.MAX_PAGE_SIZE }));
        results = results.concat(response.results);
        if (results.length >= response.count || response.results.length === 0) {
            break;
        }
        page += 1;
    }
    return results;
});
const useBulkExport = () => (0, react_query_1.useMutation)(({ branchMachine, siteSettings, timeRange, user }) => __awaiter(void 0, void 0, void 0, function* () {
    const params = { time_range: timeRange };
    const [allTransactions, xreadReports, zreadReports] = yield Promise.all([
        fetchAllPages(services_1.TransactionsService.list, Object.assign(Object.assign({}, params), { statuses: [
                globals_1.transactionStatuses.FULLY_PAID,
                ...VOID_STATUSES,
            ].join(',') })),
        fetchAllPages(services_1.XReadReportsService.list, Object.assign(Object.assign({}, params), { branch_machine_id: branchMachine.id, is_with_daily_sales_data: false })),
        fetchAllPages(services_1.ZReadReportsService.list, Object.assign(Object.assign({}, params), { branch_machine_id: branchMachine.id })),
    ]);
    const salesTransactions = allTransactions.filter((transaction) => transaction.invoice !== null &&
        !VOID_STATUSES.includes(transaction.status));
    const voidTransactions = allTransactions.filter((transaction) => VOID_STATUSES.includes(transaction.status));
    const voidTransactionsWithInvoice = voidTransactions.filter((transaction) => transaction.invoice !== null);
    const requests = [];
    if (salesTransactions.length > 0) {
        requests.push(services_1.ReportsService.bulkExportReports({
            data: salesTransactions.map((transaction) => ({
                folder_name: `invoices/${formatMonth(transaction.invoice.datetime_created)}/${formatDateTime(transaction.invoice.datetime_created)}`,
                file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
                contents: (0, print_1.createSalesInvoiceTxt)(transaction, siteSettings, true, true),
            })),
        }));
    }
    if (xreadReports.length > 0) {
        requests.push(services_1.ReportsService.bulkExportReports({
            data: xreadReports.map((report) => ({
                folder_name: `reports/xread/${formatMonth(report.generation_datetime)}/${formatDateTime(report.generation_datetime)}`,
                file_name: `XReadReport_${formatDateTime(report.generation_datetime)}_${report.id}.txt`,
                contents: (0, print_1.createXReadTxt)(report, siteSettings, user, true),
            })),
        }));
    }
    if (zreadReports.length > 0) {
        requests.push(services_1.ReportsService.bulkExportReports({
            data: zreadReports.map((report) => ({
                folder_name: `reports/zread/${formatMonth(report.generation_datetime)}/${formatDateTime(report.generation_datetime)}`,
                file_name: `ZReadReport_${formatDateTime(report.generation_datetime)}_${report.id}.txt`,
                contents: (0, print_1.createZReadTxt)(report, siteSettings, user, true),
            })),
        }));
    }
    // Voided Invoices: the full invoice content for each voided
    // transaction, reusing createSalesInvoiceTxt directly so the
    // "VOIDED TRANSACTION" footer (as opposed to "REPRINT ONLY") is
    // produced the same way it already is everywhere else. The void
    // folder exists purely to mirror the sales invoices of voided
    // transactions, so it uses the same file naming as a regular
    // sales invoice.
    if (voidTransactionsWithInvoice.length > 0) {
        requests.push(services_1.ReportsService.bulkExportReports({
            data: voidTransactionsWithInvoice.map((transaction) => ({
                folder_name: `void/${formatMonth(transaction.invoice.datetime_created)}/${formatDateTime(transaction.invoice.datetime_created)}`,
                file_name: `Sales_Invoice_${transaction.invoice.or_number}.txt`,
                contents: (0, print_1.createSalesInvoiceTxt)(transaction, siteSettings, true, true),
            })),
        }));
    }
    return Promise.all(requests);
}));
exports.useBulkExport = useBulkExport;
const useGenerateReports = ({ branchId, branchMachineId, userId, enabled, intervalMs, }) => (0, react_query_1.useQuery)(['useGenerateReports', branchId, branchMachineId], () => (0, helper_1.wrapServiceWithCatch)(services_1.ReportsService.generate({
    branch_id: branchId,
    branch_machine_id: branchMachineId,
    user_id: userId,
})), {
    enabled,
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
    notifyOnChangeProps: [],
});
exports.useGenerateReports = useGenerateReports;
