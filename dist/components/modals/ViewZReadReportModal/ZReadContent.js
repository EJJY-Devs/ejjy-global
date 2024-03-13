"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZReadContent = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const ItemBlock_1 = require("../../Printing/ItemBlock");
const { Text } = antd_1.Typography;
const ZReadContent = ({ report }) => {
    var _a, _b;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Text, { className: "font-bold block text-center" }, "Z-READING REPORT"),
        react_1.default.createElement(Text, { className: "mt-4 block text-center" }, "Report Generation Datetime"),
        report.generation_datetime && (react_1.default.createElement(Text, { className: "block text-center" },
            (0, utils_1.formatDate)(report.generation_datetime),
            " -",
            ' ',
            (0, utils_1.formatTime)(report.generation_datetime))),
        react_1.default.createElement(Text, { className: "block text-center" }, "Day Datetime"),
        react_1.default.createElement(Text, { className: "block text-center" },
            (0, utils_1.formatDate)(report.datetime_created),
            " |",
            ' ',
            [
                (0, utils_1.formatTime)(report.datetime_created),
                report.generation_datetime
                    ? (0, utils_1.formatTime)(report.generation_datetime)
                    : null,
            ]
                .filter(Boolean)
                .join(' - ')),
        react_1.default.createElement("div", { className: "mt-4" },
            react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                    {
                        label: 'Beg Sales Invoice #',
                        value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'End Sales Invoice #',
                        value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'Beg Void #',
                        value: globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'End Void #',
                        value: globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'Beg Return #',
                        value: globals_1.EMPTY_CELL,
                    },
                    {
                        label: 'End Return #',
                        value: globals_1.EMPTY_CELL,
                    },
                ] })),
        react_1.default.createElement("div", { className: "mt-4" },
            react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                    {
                        label: 'Trans. Count',
                        value: report.total_transactions,
                    },
                    {
                        label: 'Reset Counter',
                        value: 0,
                    },
                    {
                        label: 'Z Counter No.',
                        value: 0,
                    },
                ] })),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Present Accum. Sales',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Previous Accum. Sales',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Sales for the Day',
                    value: (0, utils_1.formatInPeso)(0),
                },
            ] }),
        react_1.default.createElement("div", { className: "mt-4" },
            react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                    {
                        label: 'Cash Sales',
                        value: (0, utils_1.formatInPeso)(report.cash_sales),
                        isIndented: true,
                    },
                    {
                        label: 'Credit Sales',
                        value: (0, utils_1.formatInPeso)(report.credit_pay),
                        isUnderlined: true,
                        isIndented: true,
                    },
                ] })),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "Breakdown of Sales"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'VATable Sales',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'VAT Amount',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'VAT Exempt Sales',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Zero Rated Sales',
                    value: (0, utils_1.formatInPeso)(0),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Gross Sales',
                    value: (0, utils_1.formatInPeso)(report.gross_sales),
                },
                {
                    label: 'Deduction',
                    value: (0, utils_1.formatInPeso)(0),
                    isIndented: true,
                    isParenthesized: true,
                },
                {
                    label: 'VAT Amount (12%)',
                    value: (0, utils_1.formatInPeso)(report.total_vat_adjusted),
                    isIndented: true,
                    isUnderlined: true,
                    isParenthesized: true,
                },
                {
                    label: 'NET SALES',
                    value: (0, utils_1.formatInPeso)(report.net_sales),
                    contentStyle: { fontWeight: 'bold' },
                    labelStyle: { fontWeight: 'bold' },
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "Deductions"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Disc. SC',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Disc. PWD',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Disc. NAAC',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Disc. Solo Parent',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Disc. Others',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Return',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Void',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'TOTAL',
                    value: (0, utils_1.formatInPeso)(0),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "VAT Adjustment"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Disc. SC',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Disc. PWD',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Disc. Others',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'VAT on Returns',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'Others',
                    value: (0, utils_1.formatInPeso)(0),
                },
                {
                    label: 'TOTAL',
                    value: (0, utils_1.formatInPeso)(0),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "VAT Payable"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'VAT Amount (12%)',
                    value: (0, utils_1.formatInPeso)(report.vat_amount),
                },
                {
                    label: 'VAT Adj.',
                    value: (0, utils_1.formatInPeso)(report.total_vat_adjusted),
                    isUnderlined: true,
                    isParenthesized: true,
                },
                {
                    label: 'TOTAL',
                    value: (0, utils_1.formatInPeso)(report.vat_payable),
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
exports.ZReadContent = ZReadContent;
