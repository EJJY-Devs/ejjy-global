"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printXReadReportNative = void 0;
const utils_1 = require("../../../utils");
const helper_escpos_1 = require("../../helper-escpos");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printXReadReportNative = ({ report, siteSettings, user, }) => {
    var _a, _b;
    const commands = [];
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        branchMachine: report.branch_machine,
        siteSettings,
        title: 'X-READING REPORT',
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    if (report.generation_datetime) {
        commands.push((0, helper_escpos_1.printCenter)('Report Generation Datetime'));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push((0, helper_escpos_1.printCenter)(`${(0, utils_1.formatDate)(report.generation_datetime)} - ${(0, utils_1.formatTime)(report.generation_datetime)}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    const session = report.cashiering_session;
    if (session) {
        commands.push((0, helper_escpos_1.printCenter)('Session Datetime'));
        const sessionTime = [
            (0, utils_1.formatTime)(session.datetime_started),
            session.datetime_ended ? (0, utils_1.formatTime)(session.datetime_ended) : null,
        ]
            .filter(Boolean)
            .join(' - ');
        commands.push((0, helper_escpos_1.printCenter)(`${(0, utils_1.formatDate)(session.date)} | ${sessionTime}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push((0, helper_escpos_1.printCenter)(`Cashier: ${session.user.employee_id} | ${(0, utils_1.getFullName)(session.user)}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
            value: `${report.total_transactions}`,
        },
        {
            label: 'Opening Fund:',
            value: (0, utils_1.formatInPeso)(report.opening_fund, helper_receipt_1.PESO_SIGN),
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
            value: (0, utils_1.formatInPeso)(report.gross_sales_of_the_day, helper_receipt_1.PESO_SIGN),
        },
    ]));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'Cash SI',
            value: (0, utils_1.formatInPeso)(report.sales_invoice_payments, helper_receipt_1.PESO_SIGN),
        },
        {
            label: 'Charge SI',
            value: (0, utils_1.formatInPeso)(report.charge_invoice_payments, helper_receipt_1.PESO_SIGN),
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Gross Sales Breakdown'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Payment Received'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Cash on Hand'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Transaction Summary'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
            value: (report.short_over < 0 ? '(' : '') +
                (0, utils_1.formatInPeso)(Math.abs(report.short_over), helper_receipt_1.PESO_SIGN) +
                (report.short_over < 0 ? ')' : ''),
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    if (user) {
        commands.push((0, helper_escpos_1.printCenter)(`Printed by: ${(0, utils_1.getFullName)(user)}`));
    }
    commands.push(...(0, helper_escpos_1.generateReceiptFooterCommands)(siteSettings));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('This Document Is Not Valid For Claim Of Input Tax'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Thank You!'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
exports.printXReadReportNative = printXReadReportNative;
