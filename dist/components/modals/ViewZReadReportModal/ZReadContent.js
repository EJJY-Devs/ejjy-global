"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZReadContent = void 0;
const react_1 = __importDefault(require("react"));
const no_transaction_png_1 = __importDefault(require("../../../../public/no-transaction.png"));
const globals_1 = require("../../../globals");
const helper_receipt_1 = require("../../../print/helper-receipt");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const ItemBlock_1 = require("../../Printing/ItemBlock");
const ZReadContent = ({ report, siteSettings, user, isForPrint, }) => {
    var _a, _b, _c, _d;
    const isAccrued = !!report.generated_by;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        report.gross_sales === 0 && !isForPrint && (react_1.default.createElement("img", { alt: "no transaction", className: "pointer-events-none absolute left-0 top-0 w-full", src: no_transaction_png_1.default })),
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: report.branch_machine, siteSettings: siteSettings }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { fontWeight: 'bold', textAlign: 'center' } }, isAccrued ? 'Z-ACCRUED REPORT' : 'Z-READING REPORT'),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Report Generation Datetime"),
        report.generation_datetime && (react_1.default.createElement("div", { style: { textAlign: 'center' } },
            (0, utils_1.formatDate)(report.generation_datetime),
            " -",
            ' ',
            (0, utils_1.formatTime)(report.generation_datetime))),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Day Datetime"),
        react_1.default.createElement("div", { style: { textAlign: 'center' } },
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
        react_1.default.createElement("br", null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Beg Sales Invoice #:',
                    value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'End Sales Invoice #:',
                    value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'Beg Void #:',
                    value: globals_1.EMPTY_CELL,
                },
                {
                    label: 'End Void #:',
                    value: globals_1.EMPTY_CELL,
                },
                {
                    label: 'Beg Return #:',
                    value: globals_1.EMPTY_CELL,
                },
                {
                    label: 'End Return #:',
                    value: globals_1.EMPTY_CELL,
                },
            ] }),
        react_1.default.createElement("br", null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Transaction Count:',
                    value: report.total_transactions,
                },
                {
                    label: 'Reset Counter No.:',
                    value: 0,
                },
                {
                    label: 'Z Counter No.:',
                    value: 0,
                },
                {
                    label: 'Opening Fund/Cash In:',
                    value: 0,
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Present Accumulated Sales',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Previous Accumulated Sales',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Sales for the Day',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Sales Breakdown"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'VAT Exempt Sales',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VATable Sales',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VAT Amount',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Zero Rated Sales',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Gross Amount',
                    value: (0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Deductions',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-VAT Adjustment (12%)',
                    value: (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Net Amount',
                    value: (0, utils_1.formatInPeso)(report.net_sales, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Deductions"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Disc. SC',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. PWD',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. NAAC',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. Solo Parent',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. Others',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Return',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Void',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Total',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "VAT Adjustment"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Disc. SC',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. PWD',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. Others',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+VAT on Returns',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Others',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Total',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "VAT Payable"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+VAT Amount (12%)',
                    value: (0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-VAT Adjustment',
                    value: (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Total',
                    value: (0, utils_1.formatInPeso)(report.vat_payable, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        isAccrued && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Payment Received"),
            react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                    {
                        label: '+Cash',
                        value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                    },
                    {
                        label: '+Check',
                        value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                    },
                    {
                        label: '+Credit Card',
                        value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                    },
                    {
                        label: '=Total',
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
                        label: 'Withdrawals/Cash Out',
                        value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                    },
                ] }),
            react_1.default.createElement(Printing_1.Divider, null))),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Transaction Summary"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Cash in Drawer',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Check',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Credit Card',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Opening fund/Cash In',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Withdrawal/Cash Out',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Payment Received',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Short/Over',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", null,
            "GDT:",
            ' ',
            report.generation_datetime
                ? (0, utils_1.formatDateTime)(report.generation_datetime)
                : globals_1.EMPTY_CELL),
        react_1.default.createElement("div", null,
            "PDT:",
            ' ',
            report.printing_datetime
                ? (0, utils_1.formatDateTime)(report.printing_datetime)
                : globals_1.EMPTY_CELL),
        react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between' } },
            react_1.default.createElement("div", null,
                "C: ",
                ((_c = report === null || report === void 0 ? void 0 : report.generated_by) === null || _c === void 0 ? void 0 : _c.employee_id) || globals_1.EMPTY_CELL),
            react_1.default.createElement("div", null,
                "PB:",
                ' ',
                (user === null || user === void 0 ? void 0 : user.employee_id) || ((_d = report === null || report === void 0 ? void 0 : report.generated_by) === null || _d === void 0 ? void 0 : _d.employee_id) || globals_1.EMPTY_CELL)),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings })));
};
exports.ZReadContent = ZReadContent;
