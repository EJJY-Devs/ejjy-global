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
const PrintDetails_1 = require("../../Printing/PrintDetails");
const ZReadContent = ({ report, siteSettings, user, isForPrint, }) => {
    var _a, _b, _c, _d;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        report.total_transactions === 0 && !isForPrint && (react_1.default.createElement("img", { alt: "no transaction", className: "pointer-events-none absolute left-0 top-0 w-full", src: no_transaction_png_1.default })),
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: report.branch_machine, siteSettings: siteSettings }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { fontWeight: 'bold', textAlign: 'center' } }, "Z-READING REPORT"),
        react_1.default.createElement("br", null),
        report.generation_datetime && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Report Generation Datetime"),
            react_1.default.createElement("div", { style: { textAlign: 'center' } },
                (0, utils_1.formatDate)(report.generation_datetime),
                " -",
                ' ',
                (0, utils_1.formatTime)(report.generation_datetime)))),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Day Datetime"),
        react_1.default.createElement("div", { style: { textAlign: 'center' } },
            report.branch_day_open_datetime &&
                (0, utils_1.formatDate)(report.branch_day_open_datetime),
            ' ',
            "|",
            ' ',
            [
                report.branch_day_open_datetime
                    ? (0, utils_1.formatTime)(report.branch_day_open_datetime)
                    : null,
                report.generation_datetime
                    ? (0, utils_1.formatTime)(report.generation_datetime)
                    : null,
            ]
                .filter(Boolean)
                .join(' - ')),
        react_1.default.createElement("br", null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'Beg SI/OR No.:',
                    value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'End SI/OR No.:',
                    value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'Beg Void #:',
                    value: ((_c = report.ending_void_or) === null || _c === void 0 ? void 0 : _c.or_number) || globals_1.EMPTY_CELL,
                },
                {
                    label: 'End Void #:',
                    value: ((_d = report.ending_void_or) === null || _d === void 0 ? void 0 : _d.or_number) || globals_1.EMPTY_CELL,
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
                    label: 'Reset Counter No.:',
                    value: report.reset_counter,
                },
                {
                    label: 'Z Counter No.:',
                    value: report.gross_sales === 0 ? globals_1.EMPTY_CELL : report.z_counter,
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Current Accum. Sales (end)',
                    value: (0, utils_1.formatInPeso)(report.ending_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Previous Accum. Sales (beg)',
                    value: (0, utils_1.formatInPeso)(report.beginning_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Gross Sales of the Day',
                    value: (0, utils_1.formatInPeso)(report.current_day_gross_sales, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Gross Sales of the Day',
                    value: (0, utils_1.formatInPeso)(report.current_day_gross_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Deductions',
                    value: (0, utils_1.formatInPeso)(report.current_day_deductions, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-VAT Amount',
                    value: (0, utils_1.formatInPeso)(report.current_day_vat_deductions, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Net Sales',
                    value: (0, utils_1.formatInPeso)(report.current_day_net_sales, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
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

                //To be updated
                {
                    label: '+Others',
                    value: (0, utils_1.formatInPeso)(helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Cancelled',
                    value: (0, utils_1.formatInPeso)(helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Payment Received',
                    value: (0, utils_1.formatInPeso)(report.total_payment_received, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Payment Received',
                    value: (0, utils_1.formatInPeso)(report.total_payment_received, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Opening fund',
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
                    label: '=Cash on Hand',
                    value: (0, utils_1.formatInPeso)(report.total_cash_on_hand, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Current Day Transaction Summary"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Cash on Hand',
                    value: (0, utils_1.formatInPeso)(report.total_cash_on_hand, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '-Cash in Drawer',
                    value: (0, utils_1.formatInPeso)(report.cash_in_drawer, helper_receipt_1.PESO_SIGN),
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
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "ACCUMULATED REPORTS"),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Gross Sales Breakdown"),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: 'VAT Exempt Sales',
                    value: (0, utils_1.formatInPeso)(report.vat_exempt, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VATable Sales',
                    value: (0, utils_1.formatInPeso)(report.vat_sales, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: 'VAT Amount',
                    value: (0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN),
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
                    value: (0, utils_1.formatInPeso)(report.sc_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. PWD',
                    value: (0, utils_1.formatInPeso)(report.pwd_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. NAAC',
                    value: (0, utils_1.formatInPeso)(report.naac_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. Solo Parent',
                    value: (0, utils_1.formatInPeso)(report.sp_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. Others',
                    value: (0, utils_1.formatInPeso)(report.others_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Return',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Voids',
                    value: (0, utils_1.formatInPeso)(report.void, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Accum. Deductions',
                    value: (0, utils_1.formatInPeso)(report.total_deductions, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(ItemBlock_1.ItemBlock, { items: [
                {
                    label: '+Disc. SC',
                    value: (0, utils_1.formatInPeso)(report.vat_sc_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. PWD',
                    value: (0, utils_1.formatInPeso)(report.vat_pwd_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Disc. Others',
                    value: (0, utils_1.formatInPeso)(report.vat_others_discount, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+VAT on Returns',
                    value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '+Others',
                    value: (0, utils_1.formatInPeso)(report.vat_others, helper_receipt_1.PESO_SIGN),
                },
                {
                    label: '=Accum. VAT Adjustment',
                    value: (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
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
                    label: '=Accum. VAT Payable',
                    value: (0, utils_1.formatInPeso)(report.vat_payable, helper_receipt_1.PESO_SIGN),
                },
            ] }),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement( PrintDetails_1.PrintDetails, { style: { textAlign: 'center' } }, 
                `Print Datetime: ${utils_1.formatDate(report.printing_datetime)} - ${utils_1.formatTime(report.printing_datetime)}`, { user: user }
            )
        ),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "This Document Is Not Valid For Claim Of Input Tax"),
        react_1.default.createElement("div", { style: { textAlign: 'center' } }, "Thank You!")));
};
exports.ZReadContent = ZReadContent;
