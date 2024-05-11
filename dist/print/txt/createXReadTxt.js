"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createXReadTxt = void 0;
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const helper_txt_1 = require("../helper-txt");
const createXReadTxt = (report, siteSettings, user, returnContent = false) => {
    var _a, _b;
    const cashieringSession = report.cashiering_session;
    const reportTextFile = new utils_1.ReportTextFile();
    const rowData = (0, helper_txt_1.getTxtHeader)({
        branchMachine: report.branch_machine,
        siteSettings,
    });
    rowData.push({ center: 'X-READING REPORT' });
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
    if (cashieringSession) {
        rowData.push(...[
            { center: 'Session Datetime' },
            {
                center: `${(0, utils_1.formatDate)(cashieringSession.date)} | ${[
                    (0, utils_1.formatTime)(cashieringSession.datetime_started),
                    cashieringSession.datetime_ended
                        ? (0, utils_1.formatTime)(cashieringSession.datetime_ended)
                        : null,
                ]
                    .filter(Boolean)
                    .join(' - ')}`,
            },
            {
                center: `Cashier: ${cashieringSession.user.employee_id} | ${(0, utils_1.getFullName)(cashieringSession.user)}`,
            },
        ]);
    }
    rowData.push(...[
        helper_txt_1.TXT_LINE_BREAK,
        ...(0, helper_txt_1.getTxtItemBlock)([
            {
                label: 'Beg Invoice #:',
                value: ((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL,
            },
            {
                label: 'End Invoice #:',
                value: ((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || helper_receipt_1.EMPTY_CELL,
            },
            {
                label: 'Transaction Count:',
                value: report.total_transactions,
            },
            {
                label: 'Opening Fund:',
                value: (0, utils_1.formatInPeso)(report.opening_fund, helper_receipt_1.PESO_SIGN),
            },
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Payment Received' },
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
        { center: 'Cash on Hand' },
        ...(0, helper_txt_1.getTxtItemBlock)([
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
        ]),
        { center: helper_txt_1.TXT_DIVIDER },
    ]);
    rowData.push(...[
        { center: 'Transaction Summary' },
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
    if (user) {
        rowData.push(...(0, helper_txt_1.getTxtPrintDetails)(user));
    }
    rowData.push(...[
        helper_txt_1.TXT_LINE_BREAK,
        ...(0, helper_txt_1.getTxtFooter)(siteSettings),
        { center: 'This Document Is Not Valid For Claim Of Input Tax' },
        { center: 'Thank You!' },
    ]);
    (0, helper_txt_1.writeFile)(rowData, reportTextFile);
    if (returnContent) {
        return reportTextFile.get();
    }
    reportTextFile.export(`XReadReport_${report.id}.txt`);
    return null;
};
exports.createXReadTxt = createXReadTxt;
