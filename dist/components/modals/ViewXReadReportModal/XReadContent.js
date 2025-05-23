"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XReadContent = void 0;
const react_1 = __importDefault(require("react"));
const no_transaction_png_1 = __importDefault(require("../../../../public/no-transaction.png"));
const globals_1 = require("../../../globals");
const helper_receipt_1 = require("../../../print/helper-receipt");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const ItemBlock_1 = require("../../Printing/ItemBlock");
const PrintDetails_1 = require("../../Printing/PrintDetails");
const XReadContent = ({ report, siteSettings, user, isForPrint, }) => {
    var _a, _b;
    const cashieringSession = report.cashiering_session;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        report.gross_sales === 0 && !isForPrint && (react_1.default.createElement("img", { alt: "no transaction", className: "pointer-events-none absolute left-0 top-0 w-full", src: no_transaction_png_1.default })),
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: report.branch_machine }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { fontWeight: 'bold', textAlign: 'center' } }, "X-READING REPORT"),
        react_1.default.createElement("br", null),
        report.generation_datetime && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Report Generation Datetime"),
            react_1.default.createElement("div", { style: { textAlign: 'center' } }, [
                (0, utils_1.formatDate)(report.generation_datetime),
                (0, utils_1.formatTime)(report.generation_datetime),
            ].join(' - ')))),
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
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Beg Invoice #:',
                    value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'End Invoice #:',
                    value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'Transaction Count:',
                    value: report.total_transactions,
                },
                {
                    label: 'Opening Fund:',
                    value: (0, utils_1.formatInPeso)(report.opening_fund, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Current Accum. Sales (end)',
                    value: (0, utils_1.formatInPeso)(report.ending_sales, helper_receipt_1.PESO_SIGN) || globals_1.EMPTY_CELL,
                },
                {
                    label: '-Previous Accum. Sales (beg)',
                    value: (0, utils_1.formatInPeso)(report.beginning_sales, helper_receipt_1.PESO_SIGN) || globals_1.EMPTY_CELL,
                },
                {
                    label: '=Gross Sales of the Day',
                    value: (0, utils_1.formatInPeso)(report.gross_sales_of_the_day, helper_receipt_1.PESO_SIGN) ||
                        globals_1.EMPTY_CELL,
                },
            ] }),
        react_1.default.createElement("br", null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Cash SI',
                    value: (0, utils_1.formatInPeso)(report.sales_invoice_payments, helper_receipt_1.PESO_SIGN) ||
                        globals_1.EMPTY_CELL,
                },
                {
                    label: 'Charge SI',
                    value: (0, utils_1.formatInPeso)(report.charge_invoice_payments, helper_receipt_1.PESO_SIGN) ||
                        globals_1.EMPTY_CELL,
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Gross Sales Breakdown"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'VAT Exempt Sales',
                    value: (0, utils_1.formatInPeso)(report.vat_exempt, helper_receipt_1.PESO_SIGN) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'VATable Sales',
                    value: (0, utils_1.formatInPeso)(report.vat_sales, helper_receipt_1.PESO_SIGN) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'VAT Amount',
                    value: (0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'Zero Rated Sales',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Payment Received"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Cash',
                    value: (0, utils_1.formatInPeso)(report.cash_payment, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Check',
                    value: (0, utils_1.formatInPeso)(report.check_payment, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Credit Card',
                    value: (0, utils_1.formatInPeso)(report.credit_card_payment, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Total',
                    value: (0, utils_1.formatInPeso)(report.total_payment_received, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Cash on Hand"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Payment Received',
                    value: (0, utils_1.formatInPeso)(report.total_payment_received, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Opening Fund',
                    value: (0, utils_1.formatInPeso)(report.opening_fund, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Cash In',
                    value: (0, utils_1.formatInPeso)(report.cash_in, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Cash Out',
                    value: (0, utils_1.formatInPeso)(report.cash_out, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Cash Collection',
                    value: (0, utils_1.formatInPeso)(report.cash_collection, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Total',
                    value: (0, utils_1.formatInPeso)(report.total_cash_on_hand, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Transaction Summary"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Cash in Drawer',
                    value: (0, utils_1.formatInPeso)(report.cash_in_drawer, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Cash on Hand',
                    value: (0, utils_1.formatInPeso)(report.total_cash_on_hand, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=(Short)/Over',
                    value: [
                        report.short_over < 0 ? '(' : '',
                        (0, utils_1.formatInPeso)(Math.abs(report.short_over), helper_receipt_1.PESO_SIGN),
                        report.short_over < 0 ? ')' : '',
                    ].join(''),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(PrintDetails_1.PrintDetails, { user: user }),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "This Document Is Not Valid For Claim Of Input Tax"),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Thank You!")));
};
exports.XReadContent = XReadContent;
