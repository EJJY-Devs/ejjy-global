"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDailySalesTxt = void 0;
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const helper_txt_1 = require("../helper-txt");
const createDailySalesTxt = (dailySales, siteSettings, user) => {
    var _a, _b;
    const reportTextFile = new utils_1.ReportTextFile();
    const rowData = (0, helper_txt_1.getTxtHeader)({
        branchMachine: dailySales.branch_machine,
        siteSettings,
    });
    rowData.push({ center: 'DAILY SALES REPORT' });
    if (dailySales.gross_sales === 0) {
        rowData.push(...[{ center: '(NO TRANSACTION)' }, helper_txt_1.TXT_LINE_BREAK]);
    }
    if (dailySales.generation_datetime) {
        rowData.push(...[
            { center: 'Report Generation Datetime' },
            {
                center: [
                    (0, utils_1.formatDate)(dailySales.generation_datetime),
                    (0, utils_1.formatTime)(dailySales.generation_datetime),
                ].join(' - '),
            },
        ]);
    }
    rowData.push(...[
        { center: 'Day Datetime' },
        {
            center: `${(0, utils_1.formatDate)(dailySales.datetime_created)} | ${[
                dailySales.daily_sales_data.branch_day_open_datetime
                    ? (0, utils_1.formatTime)(dailySales.daily_sales_data.branch_day_open_datetime)
                    : null,
                dailySales.generation_datetime
                    ? (0, utils_1.formatTime)(dailySales.generation_datetime)
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
                value: ((_a = dailySales.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL,
            },
            {
                label: 'End Sales Invoice #:',
                value: ((_b = dailySales.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || helper_receipt_1.EMPTY_CELL,
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        ...(0, helper_txt_1.getTxtItemBlock)([
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
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Sales Breakdown' },
        ...(0, helper_txt_1.getTxtItemBlock)([
            {
                label: 'VAT Exempt Sales',
                value: (0, utils_1.formatInPeso)(dailySales.vat_exempt, helper_receipt_1.PESO_SIGN),
            },
            {
                label: 'VATable Sales',
                value: (0, utils_1.formatInPeso)(dailySales.vat_sales, helper_receipt_1.PESO_SIGN),
            },
            {
                label: 'VAT Amount (12%)',
                value: (0, utils_1.formatInPeso)(dailySales.vat_amount, helper_receipt_1.PESO_SIGN),
            },
            {
                label: 'Zero Rated Sales',
                value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Deductions' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
                label: '+Void',
                value: (0, utils_1.formatInPeso)(dailySales.void, helper_receipt_1.PESO_SIGN),
            },
            {
                label: '=Total',
                value: (0, utils_1.formatInPeso)(dailySales.total_deductions, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'VAT Adjustment' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
                label: '=Total',
                value: (0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'VAT Payable' },
        ...(0, helper_txt_1.getTxtItemBlock)([
            {
                label: '+VAT Amount (12%)',
                value: (0, utils_1.formatInPeso)(dailySales.vat_amount, helper_receipt_1.PESO_SIGN),
            },
            {
                label: '-VAT Adjustment',
                value: (0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
            },
            {
                label: '=Total',
                value: (0, utils_1.formatInPeso)(dailySales.vat_payable, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        ...(0, helper_txt_1.getTxtItemBlock)([
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
                label: '=Net Amount',
                value: (0, utils_1.formatInPeso)(dailySales.net_sales, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Payment Received' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
            {
                label: '=Total',
                value: (0, utils_1.formatInPeso)(dailySales.total_payment_received, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Cash on Hand' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
                label: '=Total',
                value: (0, utils_1.formatInPeso)(dailySales.total_cash_on_hand, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Transaction Summary' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    if (user) {
        rowData.push(...(0, helper_txt_1.getTxtPrintDetails)(user));
    }
    rowData.push(...[helper_txt_1.TXT_LINE_BREAK, ...(0, helper_txt_1.getTxtFooter)(siteSettings)]);
    (0, helper_txt_1.writeFile)(rowData, reportTextFile);
    reportTextFile.export(`DailySales_${dailySales.id}.txt`);
    return null;
};
exports.createDailySalesTxt = createDailySalesTxt;
