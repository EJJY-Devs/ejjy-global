"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZReadTxt = void 0;
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const helper_txt_1 = require("../helper-txt");
const createZReadTxt = (report, siteSettings, user, returnContent = false) => {
    var _a, _b, _c, _d;
    const reportTextFile = new utils_1.ReportTextFile();
    const rowData = (0, helper_txt_1.getTxtHeader)({
        branchMachine: report.branch_machine,
        siteSettings,
    });
    rowData.push({ center: 'Z-READING REPORT' });
    if (report.gross_sales === 0) {
        rowData.push(...[{ center: '(NO TRANSACTION)' }, helper_txt_1.TXT_LINE_BREAK]);
    }
    if (report.generation_datetime) {
        rowData.push(...[
            { center: 'Report Generation Datetime' },
            {
                center: [
                    (0, utils_1.formatDate)(report.generation_datetime),
                    (0, utils_1.formatTime)(report.generation_datetime),
                ].join(' - '),
            },
        ]);
    }
    rowData.push(...[
        { center: 'Day Datetime' },
        {
            center: `${(0, utils_1.formatDate)(report.datetime_created)} | ${[
                report.branch_day_open_datetime
                    ? (0, utils_1.formatTime)(report.branch_day_open_datetime)
                    : null,
                report.generation_datetime
                    ? (0, utils_1.formatTime)(report.generation_datetime)
                    : null,
            ]
                .filter(Boolean)
                .join(' - ')}`,
        },
    ]);
    rowData.push(...[
        helper_txt_1.TXT_LINE_BREAK,
        ...(0, helper_txt_1.getTxtItemBlock)([
            {
                label: 'Beg Sales Invoice #:',
                value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL,
            },
            {
                label: 'End Sales Invoice #:',
                value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || helper_receipt_1.EMPTY_CELL,
            },
            {
                label: 'Beg Void #:',
                value: ((_c = report.ending_void_or) === null || _c === void 0 ? void 0 : _c.or_number) || helper_receipt_1.EMPTY_CELL,
            },
            {
                label: 'End Void #:',
                value: ((_d = report.ending_void_or) === null || _d === void 0 ? void 0 : _d.or_number) || helper_receipt_1.EMPTY_CELL,
            },
            {
                label: 'Beg Return #:',
                value: helper_receipt_1.EMPTY_CELL,
            },
            {
                label: 'End Return #:',
                value: helper_receipt_1.EMPTY_CELL,
            },
        ]),
        helper_txt_1.TXT_LINE_BREAK,
        ...(0, helper_txt_1.getTxtItemBlock)([
            {
                label: 'Reset Counter No.:',
                value: report.reset_counter,
            },
            {
                label: 'Z Counter No.:',
                value: report.id,
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        ...(0, helper_txt_1.getTxtItemBlock)([
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
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        ...(0, helper_txt_1.getTxtItemBlock)([
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
                label: '=Net Amount',
                value: (0, utils_1.formatInPeso)(report.current_day_net_sales, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Current Day Payment Received' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Current Day Cash on Hand' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
                label: '=Total',
                value: (0, utils_1.formatInPeso)(report.total_cash_on_hand, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Current Day Transaction Summary' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Accumulated Sales Breakdown' },
        ...(0, helper_txt_1.getTxtItemBlock)([
            {
                label: 'VAT Exempt Sales',
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
                label: 'Zero Rated Sales',
                value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Accumulated Deductions' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
                label: '+Void',
                value: (0, utils_1.formatInPeso)(report.void, helper_receipt_1.PESO_SIGN),
            },
            {
                label: '=Total',
                value: (0, utils_1.formatInPeso)(report.total_deductions, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Accumulated VAT Adjustment' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
                label: '=Total',
                value: (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Accumulated VAT Payable' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    if (user) {
        rowData.push(...(0, helper_txt_1.getTxtPrintDetails)(user));
    }
    rowData.push(...[
        helper_txt_1.TXT_LINE_BREAK,
        ...(0, helper_txt_1.getTxtFooter)(siteSettings),
        { center: 'This Document Is Not Valid For Claim Of Input Tax' },
        { center: 'Thank You!' },
    ]);
    if (returnContent) {
        return reportTextFile.get();
    }
    reportTextFile.export(`ZReadReport_${report.id}.txt`);
    return null;
};
exports.createZReadTxt = createZReadTxt;
