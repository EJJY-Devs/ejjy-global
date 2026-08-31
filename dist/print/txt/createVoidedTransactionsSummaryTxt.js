"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVoidedTransactionsSummaryTxt = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const helper_txt_1 = require("../helper-txt");
// Summary listing of voided transactions (one row per OR number + amount),
// mirroring the on-screen print/receipt/printCancelledTransactions.ts content
// but written out as a .txt e-journal export instead of an HTML print.
const createVoidedTransactionsSummaryTxt = (transactions, siteSettings, user, timeRange, returnContent = false) => {
    var _a;
    const branchMachine = (_a = transactions === null || transactions === void 0 ? void 0 : transactions[0]) === null || _a === void 0 ? void 0 : _a.branch_machine;
    const totalAmount = transactions.reduce((total, transaction) => total + Number(transaction.total_amount), 0);
    const rowData = (0, helper_txt_1.getTxtHeader)({
        branchMachine,
        siteSettings,
    });
    rowData.push(...[
        helper_txt_1.TXT_LINE_BREAK,
        { center: 'VOIDED TRANSACTIONS REPORT' },
        helper_txt_1.TXT_LINE_BREAK,
        { left: 'Date Range:', right: timeRange },
        helper_txt_1.TXT_LINE_BREAK,
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    transactions.forEach((transaction) => {
        var _a;
        rowData.push({
            left: ((_a = transaction === null || transaction === void 0 ? void 0 : transaction.invoice) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL,
            right: (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN),
        });
    });
    rowData.push(...[
        { right: '----------------' },
        { left: 'TOTAL', right: (0, utils_1.formatInPeso)(totalAmount, helper_receipt_1.PESO_SIGN) },
    ]);
    if (user) {
        rowData.push(...[helper_txt_1.TXT_LINE_BREAK, (0, helper_txt_1.getTxtPrintDetails)(user)]);
    }
    rowData.push(...[helper_txt_1.TXT_LINE_BREAK, ...(0, helper_txt_1.getTxtFooter)(siteSettings)]);
    const reportTextFile = (0, helper_txt_1.writeFile)(rowData);
    if (returnContent) {
        return reportTextFile.get();
    }
    reportTextFile.export(`VoidedTransactions_${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}.txt`);
    return null;
};
exports.createVoidedTransactionsSummaryTxt = createVoidedTransactionsSummaryTxt;
