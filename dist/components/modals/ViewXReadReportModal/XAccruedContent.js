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
const { Text } = antd_1.Typography;
const XAccruedContent = ({ report }) => {
    var _a, _b;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Text, { strong: true, className: "block" }, "Current Day Accumulated Report"),
        react_1.default.createElement(Text, { strong: true, className: "block" }, "X-READ (end session report)"),
        react_1.default.createElement(Text, { className: "block mt-4" }, "INVOICE NUMBER"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { data: [
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
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { data: [
                { label: 'Beg', value: (0, utils_1.formatInPeso)(report.beginning_sales) },
                { label: 'Cur', value: (0, utils_1.formatInPeso)(report.gross_sales) },
                { label: 'End', value: (0, utils_1.formatInPeso)(report.ending_sales) },
            ] }),
        react_1.default.createElement(Text, { className: "block" }, "TRANSACTION COUNT"),
        react_1.default.createElement(Printing_1.ReceiptReportSummary, { data: [
                { label: 'Beg', value: report.beginning_transactions_count },
                { label: 'Cur', value: report.total_transactions },
                { label: 'End', value: report.ending_transactions_count },
            ] }),
        react_1.default.createElement(Text, { className: "w-full mt-4 text-center block" }, "CURRENT SALES BREAKDOWN"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-full", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Cash Sales" },
                (0, utils_1.formatInPeso)(report.cash_sales),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Credit Sales" },
                react_1.default.createElement(Printing_1.ReceiptUnderlinedValue, { postfix: "\u00A0", value: Number(report.credit_pay) })),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Gross Sales" },
                (0, utils_1.formatInPeso)(report.gross_sales),
                "\u00A0")),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "Breakdown of Sales"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-full", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Exempt" },
                (0, utils_1.formatInPeso)(report.vat_exempt),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VATable Sales" },
                (0, utils_1.formatInPeso)(report.vat_sales),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Amount (12%)" },
                (0, utils_1.formatInPeso)(report.vat_amount),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "ZERO Rated" },
                (0, utils_1.formatInPeso)(0),
                "\u00A0")),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-full", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Gross Sales" },
                (0, utils_1.formatInPeso)(report.gross_sales),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Deduction", labelStyle: { paddingLeft: 30 } },
                react_1.default.createElement(Printing_1.ReceiptUnderlinedValue, { postfix: ")", prefix: "(", value: 0 })),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Amount (12%)", labelStyle: { paddingLeft: 30 } },
                react_1.default.createElement(Printing_1.ReceiptUnderlinedValue, { postfix: ")", prefix: "(", value: report.total_vat_adjusted })),
            react_1.default.createElement(antd_1.Descriptions.Item, { contentStyle: { fontWeight: 'bold' }, label: "NET SALES", labelStyle: { fontWeight: 'bold' } },
                (0, utils_1.formatInPeso)(report.net_sales),
                "\u00A0")),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "Deductions"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-full", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. SC" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. PWD" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. NAAC" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. Solo Parent" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. Others" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Return" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Void" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "TOTAL" }, null)),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "VAT Adjustment"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-full", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. SC" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. PWD" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Disc. Others" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT on Returns" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "Others" }, null),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "TOTAL" }, null)),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(Text, { className: "w-full text-center block" }, "VAT Payable"),
        react_1.default.createElement(antd_1.Descriptions, { className: "w-full", colon: false, column: 1, contentStyle: {
                textAlign: 'right',
                display: 'block',
            }, labelStyle: {
                width: 200,
            }, size: "small" },
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Amount (12%)" },
                (0, utils_1.formatInPeso)(report.vat_amount),
                "\u00A0"),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "VAT Adj." },
                react_1.default.createElement(Printing_1.ReceiptUnderlinedValue, { postfix: ")", prefix: "(", value: report.total_vat_adjusted })),
            react_1.default.createElement(antd_1.Descriptions.Item, { label: "TOTAL" },
                (0, utils_1.formatInPeso)(report.vat_payable),
                "\u00A0"))));
};
exports.XAccruedContent = XAccruedContent;
