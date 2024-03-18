"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XEjournalContent = void 0;
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../../globals");
const helper_receipt_1 = require("../../../../print/helper-receipt");
const utils_1 = require("../../../../utils");
const Printing_1 = require("../../../Printing");
const ItemBlock_1 = require("../../../Printing/ItemBlock");
const XEjournalContent = ({ report }) => {
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
            react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                    {
                        label: 'Beg Invoice #',
                        value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'End Invoice #',
                        value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || globals_1.EMPTY_CELL,
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
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
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
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Payment Received"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
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
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Transaction Adjustments"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
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
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Transaction Summary"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
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
exports.XEjournalContent = XEjournalContent;
