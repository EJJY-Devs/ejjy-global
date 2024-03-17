"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printXReadReport = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printXReadReport = (report, siteSettings, user, isPdf = false) => {
    var _a, _b;
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
            react_1.default.createElement(helper_receipt_1.Header, { siteSettings: siteSettings, branchMachine: report.branch_machine }),
            (report === null || report === void 0 ? void 0 : report.gross_sales) === 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("br", null),
                react_1.default.createElement("div", { style: { textAlign: 'center' } }, "NO TRANSACTION"))),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", null, report.generated_by ? (react_1.default.createElement(XAccruedContent, { report: report })) : (react_1.default.createElement(XReadContent, { report: report }))),
            react_1.default.createElement(helper_receipt_1.Divider, null),
            react_1.default.createElement("div", null,
                "GDT:",
                ' ',
                report.generation_datetime
                    ? (0, utils_1.formatDateTime)(report.generation_datetime)
                    : helper_receipt_1.EMPTY_CELL),
            react_1.default.createElement("div", null,
                "PDT:",
                ' ',
                report.printing_datetime
                    ? (0, utils_1.formatDateTime)(report.printing_datetime)
                    : helper_receipt_1.EMPTY_CELL),
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between' } },
                react_1.default.createElement("div", null,
                    "C: ",
                    ((_a = report === null || report === void 0 ? void 0 : report.cashiering_session) === null || _a === void 0 ? void 0 : _a.user.employee_id) || helper_receipt_1.EMPTY_CELL),
                react_1.default.createElement("div", null,
                    "PB:",
                    ' ',
                    (user === null || user === void 0 ? void 0 : user.employee_id) ||
                        ((_b = report === null || report === void 0 ? void 0 : report.generated_by) === null || _b === void 0 ? void 0 : _b.employee_id) ||
                        helper_receipt_1.EMPTY_CELL)),
            react_1.default.createElement("br", null),
            react_1.default.createElement(helper_receipt_1.Footer, { siteSettings: siteSettings }))));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'XRead Report');
};
exports.printXReadReport = printXReadReport;
const XReadContent = ({ report }) => {
    var _a, _b;
    const cashieringSession = report.cashiering_session;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: { fontWeight: 'bold', textAlign: 'center' } }, "X-READING REPORT"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Report Generation Datetime"),
        react_1.default.createElement("div", { style: { textAlign: 'center' } },
            (0, utils_1.formatDate)(report.datetime_created),
            " -",
            ' ',
            (0, utils_1.formatTime)(report.datetime_created)),
        cashieringSession && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Session Datetime"),
            react_1.default.createElement("div", { style: { textAlign: 'center' } },
                (0, utils_1.formatDate)(cashieringSession.date),
                " |",
                ' ',
                [
                    (0, utils_1.formatTime)(cashieringSession.datetime_started),
                    cashieringSession.datetime_ended
                        ? (0, utils_1.formatTime)(cashieringSession.datetime_ended)
                        : null,
                ]
                    .filter(Boolean)
                    .join(' - ')),
            react_1.default.createElement("div", { style: { textAlign: 'center' } },
                "Cashier: ",
                cashieringSession.user.employee_id,
                " |",
                ' ',
                (0, utils_1.getFullName)(cashieringSession.user)))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", null,
            react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                    {
                        label: 'Beg Invoice #',
                        value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL,
                    },
                    {
                        label: 'End Invoice #',
                        value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || helper_receipt_1.EMPTY_CELL,
                    },
                    {
                        label: 'Trans. Count',
                        value: report.total_transactions,
                    },
                    {
                        label: 'Opening Fund',
                        value: (0, utils_1.formatInPeso)(report.beginning_sales, helper_receipt_1.PESO_SIGN),
                    },
                ] })),
        react_1.default.createElement(helper_receipt_1.Divider, null),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'Cash Sales',
                    value: (0, utils_1.formatInPeso)(report.cash_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Credit Sales',
                    value: (0, utils_1.formatInPeso)(report.credit_pay, helper_receipt_1.PESO_SIGN),
                    isUnderlined: true,
                },
            ] }),
        react_1.default.createElement(helper_receipt_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Payment Received"),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'Cash',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Check',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Credit Card',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Total Payments',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(helper_receipt_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Transaction Adjustments"),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'Void',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Refund',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Withdrawals',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(helper_receipt_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Transaction Summary"),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'Cash in Drawer',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Check',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Credit Card',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Opening fund',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Withdrawal',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                    isIndented: true,
                    isParenthesized: true,
                },
                {
                    label: 'Payment Received',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                    isIndented: true,
                    isParenthesized: true,
                },
                {
                    label: 'Short / Over',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] })));
};
const XAccruedContent = ({ report }) => {
    var _a, _b;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, "Current Day Accumulated Report"),
        react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, "X-READ (end session report)"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", null, "INVOICE NUMBER"),
        react_1.default.createElement(helper_receipt_1.ReceiptReportSummary, { items: [
                {
                    label: 'Beg Invoice #',
                    value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL,
                },
                {
                    label: 'End Invoice #',
                    value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || helper_receipt_1.EMPTY_CELL,
                },
            ] }),
        react_1.default.createElement("div", null, "SALES"),
        react_1.default.createElement(helper_receipt_1.ReceiptReportSummary, { items: [
                {
                    label: 'Beg',
                    value: (0, utils_1.formatInPeso)(report.beginning_sales, helper_receipt_1.PESO_SIGN),
                },
                { label: 'Cur', value: (0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN) },
                { label: 'End', value: (0, utils_1.formatInPeso)(report.ending_sales, helper_receipt_1.PESO_SIGN) },
            ] }),
        react_1.default.createElement("div", null, "TRANSACTION COUNT"),
        react_1.default.createElement(helper_receipt_1.ReceiptReportSummary, { items: [
                { label: 'Beg', value: report.beginning_transactions_count },
                { label: 'Cur', value: report.total_transactions },
                { label: 'End', value: report.ending_transactions_count },
            ] }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "CURRENT SALES BREAKDOWN"),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'Cash Sales',
                    value: (0, utils_1.formatInPeso)(report.cash_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Credit Sales',
                    value: (0, utils_1.formatInPeso)(report.credit_pay, helper_receipt_1.PESO_SIGN),
                    isUnderlined: true,
                },
                {
                    label: 'Gross Sales',
                    value: (0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(helper_receipt_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Breakdown of Sales"),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'VAT Exempt',
                    value: (0, utils_1.formatInPeso)(report.vat_exempt, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VATable Sales',
                    value: (0, utils_1.formatInPeso)(report.vat_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VAT Amount (12%)',
                    value: (0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'ZERO Rated',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(helper_receipt_1.Divider, null),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'Gross Sales',
                    value: (0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Deduction',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                    isIndented: true,
                    isParenthesized: true,
                },
                {
                    label: 'VAT Amount (12%)',
                    value: (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
                    isIndented: true,
                    isUnderlined: true,
                    isParenthesized: true,
                },
                {
                    label: 'NET SALES',
                    value: (0, utils_1.formatInPeso)(report.net_sales, helper_receipt_1.PESO_SIGN),
                    contentStyle: { fontWeight: 'bold' },
                    labelStyle: { fontWeight: 'bold' },
                },
            ] }),
        react_1.default.createElement(helper_receipt_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Deductions"),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'Disc. SC',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Disc. PWD',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Disc. NAAC',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Disc. Solo Parent',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Disc. Others',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Return',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Void',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'TOTAL',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(helper_receipt_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "VAT Adjustment"),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'Disc. SC',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Disc. PWD',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Disc. Others',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VAT on Returns',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Others',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'TOTAL',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(helper_receipt_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "VAT Payable"),
        react_1.default.createElement(helper_receipt_1.ItemBlock, { items: [
                {
                    label: 'VAT Amount (12%)',
                    value: (0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VAT Adj.',
                    value: (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
                    isUnderlined: true,
                    isParenthesized: true,
                },
                {
                    label: 'TOTAL',
                    value: (0, utils_1.formatInPeso)(report.vat_payable, helper_receipt_1.PESO_SIGN),
                },
            ] })));
};
