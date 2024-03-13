"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XReadContent = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const ItemBlock_1 = require("../../Printing/ItemBlock");
const { Text } = antd_1.Typography;
const XReadContent = ({ report }) => {
    var _a, _b;
    const cashieringSession = report.cashiering_session;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Text, { className: "font-bold block text-center" }, "X-READING REPORT"),
        react_1.default.createElement(Text, { className: "mt-4 block text-center" }, "Report Generation Datetime"),
        react_1.default.createElement(Text, { className: "block text-center" },
            (0, utils_1.formatDate)(report.datetime_created),
            " -",
            ' ',
            (0, utils_1.formatTime)(report.datetime_created)),
        cashieringSession && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Text, { className: "block text-center" }, "Session Datetime"),
            react_1.default.createElement(Text, { className: "block text-center" },
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
            react_1.default.createElement(Text, { className: "block text-center" },
                "Cashier: ",
                cashieringSession.user.employee_id,
                " |",
                ' ',
                (0, utils_1.getFullName)(cashieringSession.user)))),
        react_1.default.createElement("div", { className: "mt-4" },
            react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                    {
                        label: 'Beg Invoice #',
                        value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'End Invoice #',
                        value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || globals_1.EMPTY_CELL,
                        isUnderlined: true,
                    },
                    {
                        label: 'Trans. Count',
                        value: (0, utils_1.formatInPeso)(report.total_transactions),
                    },
                    {
                        label: 'Opening Fund',
                        value: (0, utils_1.formatInPeso)(report.beginning_sales),
                    },
                ] })),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Cash Sales',
                    value: (0, utils_1.formatInPeso)(report.cash_sales),
                },
                {
                    label: 'Credit Sales',
                    value: (0, utils_1.formatInPeso)(report.credit_pay),
                    isUnderlined: true,
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "Payment Received"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Cash',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Check',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Credit Card',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Total Payments',
                    value: (0, utils_1.formatInPeso)(0),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "Transaction Adjustments"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Void',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Refund',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Withdrawals',
                    value: (0, utils_1.formatInPeso)(0),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "Transaction Summary"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Cash in Drawer',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Check',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Credit Card',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Opening fund',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Withdrawal',
                    value: (0, utils_1.formatInPeso)(0),
                    isIndented: true,
                    isParenthesized: true,
                },
                {
                    label: 'Payment Received',
                    value: (0, utils_1.formatInPeso)(0),
                    isIndented: true,
                    isParenthesized: true,
                },
                {
                    label: 'Short / Over',
                    value: (0, utils_1.formatInPeso)(0),
                },
            ] })));
};
exports.XReadContent = XReadContent;
