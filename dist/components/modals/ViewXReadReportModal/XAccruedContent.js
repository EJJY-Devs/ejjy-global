"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XAccruedContent = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const ItemBlock_1 = require("../../Printing/ItemBlock");
const { Text } = antd_1.Typography;
const XAccruedContent = ({ report }) => {
    var _a, _b;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Text, { strong: true, className: "block" }, "Current Day Accumulated Report"),
        react_1.default.createElement(Text, { strong: true, className: "block" }, "X-READ (end session report)"),
        react_1.default.createElement(Text, { className: "block mt-4" }, "INVOICE NUMBER"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { items: [
                {
                    label: 'Beg Invoice #',
                    value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'End Invoice #',
                    value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || globals_1.EMPTY_CELL,
                },
            ] }),
        react_1.default.createElement(Text, { className: "block" }, "SALES"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { items: [
                { label: 'Beg', value: (0, utils_1.formatInPeso)(report.beginning_sales) },
                { label: 'Cur', value: (0, utils_1.formatInPeso)(report.gross_sales) },
                { label: 'End', value: (0, utils_1.formatInPeso)(report.ending_sales) },
            ] }),
        react_1.default.createElement(Text, { className: "block" }, "TRANSACTION COUNT"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { items: [
                { label: 'Beg', value: report.beginning_transactions_count },
                { label: 'Cur', value: report.total_transactions },
                { label: 'End', value: report.ending_transactions_count },
            ] }),
        react_1.default.createElement(Text, { className: "w-full mt-4 text-center block" }, "CURRENT SALES BREAKDOWN"),
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
                {
                    label: 'Gross Sales',
                    value: (0, utils_1.formatInPeso)(report.gross_sales),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "Breakdown of Sales"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'VAT Exempt',
                    value: (0, utils_1.formatInPeso)(report.vat_exempt),
                },
                {
                    label: 'VATable Sales',
                    value: (0, utils_1.formatInPeso)(report.vat_sales),
                },
                {
                    label: 'VAT Amount (12%)',
                    value: (0, utils_1.formatInPeso)(report.vat_amount),
                },
                {
                    label: 'ZERO Rated',
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
                    isUnderlined: true,
                    isParenthesized: true,
                },
                {
                    label: 'VAT Amount (12%)',
                    value: (0, utils_1.formatInPeso)(report.total_vat_adjusted),
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
            ] })));
};
exports.XAccruedContent = XAccruedContent;
