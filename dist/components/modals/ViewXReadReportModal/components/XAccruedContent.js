"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XAccruedContent = void 0;
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../../globals");
const helper_receipt_1 = require("../../../../print/helper-receipt");
const utils_1 = require("../../../../utils");
const Printing_1 = require("../../../Printing");
const ItemBlock_1 = require("../../../Printing/ItemBlock");
const XAccruedContent = ({ report }) => {
    var _a, _b;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, "Current Day Accumulated Report"),
        react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, "X-READ (end session report)"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", null, "INVOICE NUMBER"),
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
        react_1.default.createElement("div", null, "SALES"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { items: [
                {
                    label: 'Beg',
                    value: (0, utils_1.formatInPeso)(report.beginning_sales, helper_receipt_1.PESO_SIGN),
                },
                { label: 'Cur', value: (0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN) },
                { label: 'End', value: (0, utils_1.formatInPeso)(report.ending_sales, helper_receipt_1.PESO_SIGN) },
            ] }),
        react_1.default.createElement("div", null, "TRANSACTION COUNT"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { items: [
                { label: 'Beg', value: report.beginning_transactions_count },
                { label: 'Cur', value: report.total_transactions },
                { label: 'End', value: report.ending_transactions_count },
            ] }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "CURRENT SALES BREAKDOWN"),
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
                {
                    label: 'Gross Sales',
                    value: (0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Breakdown of Sales"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
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
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
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
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Deductions"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
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
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "VAT Adjustment"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
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
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "VAT Payable"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
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
exports.XAccruedContent = XAccruedContent;
