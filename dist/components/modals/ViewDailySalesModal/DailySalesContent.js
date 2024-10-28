"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailySalesContent = void 0;
const react_1 = __importDefault(require("react"));
const no_transaction_png_1 = __importDefault(require("../../../../public/no-transaction.png"));
const globals_1 = require("../../../globals");
const helper_receipt_1 = require("../../../print/helper-receipt");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const ItemBlock_1 = require("../../Printing/ItemBlock");
const DailySalesContent = ({ dailySales, siteSettings, user, isForPrint, }) => {
    var _a, _b;
    const cashieringSession = dailySales.cashiering_session;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        dailySales.gross_sales === 0 && !isForPrint && (react_1.default.createElement("img", { alt: "no transaction", className: "pointer-events-none absolute left-0 top-0 w-full", src: no_transaction_png_1.default })),
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: dailySales.branch_machine, siteSettings: siteSettings }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { fontWeight: 'bold', textAlign: 'center' } }, "DAILY SALES REPORT"),
        react_1.default.createElement("br", null),
        dailySales.generation_datetime && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Report Generation Datetime"),
            react_1.default.createElement("div", { style: { textAlign: 'center' } },
                (0, utils_1.formatDate)(dailySales.generation_datetime),
                " -",
                ' ',
                (0, utils_1.formatTime)(dailySales.generation_datetime)))),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Day Datetime"),
        react_1.default.createElement("div", { style: { textAlign: 'center' } },
            (0, utils_1.formatDate)(dailySales.daily_sales_data.branch_day_open_datetime),
            " |",
            ' ',
            [
                dailySales.daily_sales_data.branch_day_open_datetime
                    ? (0, utils_1.formatTime)(dailySales.daily_sales_data.branch_day_open_datetime)
                    : null,
                dailySales.generation_datetime
                    ? (0, utils_1.formatTime)(dailySales.generation_datetime)
                    : null,
            ]
                .filter(Boolean)
                .join(' - ')),
        react_1.default.createElement("br", null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Beg SI/OR No.:',
                    value: ((_a = dailySales.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'End SI/OR No.:',
                    value: ((_b = dailySales.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || globals_1.EMPTY_CELL,
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Current Accum. Sales (end)',
                    value: (0, utils_1.formatInPeso)(dailySales.ending_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Previous Accum. Sales (beg)',
                    value: (0, utils_1.formatInPeso)(dailySales.beginning_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Gross Sales of the Day',
                    value: (0, utils_1.formatInPeso)(dailySales.gross_sales, helper_receipt_1.PESO_SIGN),
                },
            ] }),
            react_1.default.createElement("br", null),             
            react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [{
                    label: 'Cash SI',
                    value: (0, utils_1.formatInPeso)(dailySales.sales_invoice_payments, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Charge SI',
                    value: (0, utils_1.formatInPeso)(dailySales.charge_invoice_payments, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Gross Sales Breakdown"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'VAT Exempt Sales',
                    value: (0, utils_1.formatInPeso)(dailySales.vat_exempt, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VATable Sales',
                    value: (0, utils_1.formatInPeso)(dailySales.vat_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VAT Amount',
                    value: (0, utils_1.formatInPeso)(dailySales.vat_amount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'Zero Rated Sales',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Disc. SC',
                    value: (0, utils_1.formatInPeso)(dailySales.sc_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. PWD',
                    value: (0, utils_1.formatInPeso)(dailySales.pwd_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. NAAC',
                    value: (0, utils_1.formatInPeso)(dailySales.naac_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. Solo Parent',
                    value: (0, utils_1.formatInPeso)(dailySales.sp_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. Others',
                    value: (0, utils_1.formatInPeso)(dailySales.others_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Return',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Voids',
                    value: (0, utils_1.formatInPeso)(dailySales.void, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Deductions',
                    value: (0, utils_1.formatInPeso)(dailySales.total_deductions, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
            {
                label: '+Regular',
                value: (0, utils_1.formatInPeso)(dailySales.regular_discount, helper_receipt_1.PESO_SIGN),
            },
            {
                label: '+Special',
                value: (0, utils_1.formatInPeso)(dailySales.special_discount, helper_receipt_1.PESO_SIGN),
            },
            {
                label: '=Discounts',
                value: (0, utils_1.formatInPeso)(dailySales.sum_of_discounts, helper_receipt_1.PESO_SIGN),
            },
        ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Disc. SC',
                    value: (0, utils_1.formatInPeso)(dailySales.vat_sc_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. PWD',
                    value: (0, utils_1.formatInPeso)(dailySales.vat_pwd_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. Others',
                    value: (0, utils_1.formatInPeso)(dailySales.vat_others_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+VAT on Returns',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Others',
                    value: (0, utils_1.formatInPeso)(dailySales.vat_others, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=VAT Adjustment',
                    value: (0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+VAT Amount (12%)',
                    value: (0, utils_1.formatInPeso)(dailySales.vat_amount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-VAT Adjustment',
                    value: (0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=VAT Payable',
                    value: (0, utils_1.formatInPeso)(dailySales.vat_payable, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Gross Sales of the Day',
                    value: (0, utils_1.formatInPeso)(dailySales.gross_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Deductions',
                    value: (0, utils_1.formatInPeso)(dailySales.total_deductions, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-VAT Amount',
                    value: (0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Net Sales',
                    value: (0, utils_1.formatInPeso)(dailySales.net_sales, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Cash',
                    value: (0, utils_1.formatInPeso)(dailySales.cash_payment, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Check',
                    value: (0, utils_1.formatInPeso)(dailySales.check_payment, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Credit Card',
                    value: (0, utils_1.formatInPeso)(dailySales.credit_card_payment, helper_receipt_1.PESO_SIGN),
                },

                //To be added
                {
                    label: '+Others',
                    value: (0, utils_1.formatInPeso)(helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Cancelled',
                    value: (0, utils_1.formatInPeso)(dailySales.void, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Payments Received',
                    value: (0, utils_1.formatInPeso)(dailySales.total_payment_received, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Payment Received',
                    value: (0, utils_1.formatInPeso)(dailySales.total_payment_received, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Opening fund',
                    value: (0, utils_1.formatInPeso)(dailySales.opening_fund, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Cash In',
                    value: (0, utils_1.formatInPeso)(dailySales.cash_in, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Cash Out',
                    value: (0, utils_1.formatInPeso)(dailySales.cash_out, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Cash Collection',
                    value: (0, utils_1.formatInPeso)(dailySales.cash_collection, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Cash on Hand',
                    value: (0, utils_1.formatInPeso)(dailySales.total_cash_on_hand, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Transaction Summary"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Cash in Drawer',
                    value: (0, utils_1.formatInPeso)(dailySales.cash_in_drawer, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Cash on Hand',
                    value: (0, utils_1.formatInPeso)(dailySales.total_cash_on_hand, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=(Short)/Over',
                    value: [
                        dailySales.short_over < 0 ? '(' : '',
                        (0, utils_1.formatInPeso)(Math.abs(dailySales.short_over), helper_receipt_1.PESO_SIGN),
                        dailySales.short_over < 0 ? ')' : '',
                    ].join(''),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } },
            react_1.default.createElement("span", null, `Print Details: ${utils_1.formatDate(dailySales.generation_datetime)} - ${utils_1.formatTime(dailySales.generation_datetime)} `),
            dailySales.generated_by ? 
                react_1.default.createElement("span", null, ` ${dailySales.generated_by.employee_id}`) 
                : " auto"
        ),  
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings })));
};
exports.DailySalesContent = DailySalesContent;
