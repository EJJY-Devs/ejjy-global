"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printZReadReportNative = void 0;
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const helper_escpos_1 = require("../../helper-escpos");
const escpos_enum_1 = require("../../utils/escpos.enum");
const helper_escpos_2 = require("../../helper-escpos");
const globals_1 = require("../../../globals");
const printZReadReportNative = ({ report, siteSettings, user, }) => {
    var _a, _b, _c, _d;
    const commands = [];
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Header
    commands.push(...(0, helper_escpos_2.generateReceiptHeaderCommands)({
        branchMachine: report.branch_machine,
        siteSettings,
        title: 'Z-READING REPORT',
    }), escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Generation Datetime
    if (report.generation_datetime) {
        commands.push((0, helper_escpos_1.printCenter)('Report Generation Datetime'));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push((0, helper_escpos_1.printCenter)(`${(0, utils_1.formatDate)(report.generation_datetime)} - ${(0, utils_1.formatTime)(report.generation_datetime)}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push((0, helper_escpos_1.printCenter)('Day Datetime'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    const openTime = report.branch_day_open_datetime
        ? (0, utils_1.formatTime)(report.branch_day_open_datetime)
        : null;
    const closeTime = report.generation_datetime
        ? (0, utils_1.formatTime)(report.generation_datetime)
        : null;
    const openDate = report.branch_day_open_datetime
        ? (0, utils_1.formatDate)(report.branch_day_open_datetime)
        : globals_1.EMPTY_CELL;
    const timeRange = [openTime, closeTime].filter(Boolean).join(' - ');
    commands.push((0, helper_escpos_1.printCenter)(`${openDate} | ${timeRange}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
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
            value: ((_c = report.ending_void_or) === null || _c === void 0 ? void 0 : _c.or_number) || globals_1.EMPTY_CELL,
        },
        {
            label: 'End Void #:',
            value: ((_d = report.ending_void_or) === null || _d === void 0 ? void 0 : _d.or_number) || globals_1.EMPTY_CELL,
        },
        { label: 'Beg Return #:', value: globals_1.EMPTY_CELL },
        { label: 'End Return #:', value: globals_1.EMPTY_CELL },
    ]));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
        { label: 'Reset Counter No.:', value: report.reset_counter },
        {
            label: 'Z Counter No.:',
            value: report.gross_sales === 0 ? globals_1.EMPTY_CELL : report.z_counter,
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Current Day Payment Received'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
        { label: '+Cash', value: (0, utils_1.formatInPeso)(report.cash_payment, helper_receipt_1.PESO_SIGN) },
        { label: '+Check', value: (0, utils_1.formatInPeso)(report.check_payment, helper_receipt_1.PESO_SIGN) },
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
    commands.push((0, helper_escpos_1.printCenter)('Current Day Cash on Hand'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
        {
            label: '+Payment Received',
            value: (0, utils_1.formatInPeso)(report.total_payment_received, helper_receipt_1.PESO_SIGN),
        },
        {
            label: '+Opening fund',
            value: (0, utils_1.formatInPeso)(report.opening_fund, helper_receipt_1.PESO_SIGN),
        },
        { label: '+Cash In', value: (0, utils_1.formatInPeso)(report.cash_in, helper_receipt_1.PESO_SIGN) },
        { label: '-Cash Out', value: (0, utils_1.formatInPeso)(report.cash_out, helper_receipt_1.PESO_SIGN) },
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
    commands.push((0, helper_escpos_1.printCenter)('Current Day Transaction Summary'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
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
    commands.push((0, helper_escpos_1.printCenter)('Accumulated Sales Breakdown'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
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
        { label: 'Zero Rated Sales', value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN) },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Accumulated Deductions'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
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
        { label: '+Return', value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN) },
        { label: '+Void', value: (0, utils_1.formatInPeso)(report.void, helper_receipt_1.PESO_SIGN) },
        {
            label: '=Total',
            value: (0, utils_1.formatInPeso)(report.total_deductions, helper_receipt_1.PESO_SIGN),
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Accumulated VAT Adjustment'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
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
        { label: '+VAT on Returns', value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN) },
        { label: '+Others', value: (0, utils_1.formatInPeso)(report.vat_others, helper_receipt_1.PESO_SIGN) },
        {
            label: '=Total',
            value: (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Accumulated VAT Payable'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_2.generateItemBlockCommands)([
        {
            label: '+VAT Amount (12%)',
            value: (0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN),
        },
        {
            label: '-VAT Adjustment',
            value: (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
        },
        { label: '=Total', value: (0, utils_1.formatInPeso)(report.vat_payable, helper_receipt_1.PESO_SIGN) },
    ]));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Printed by
    if (user) {
        commands.push((0, helper_escpos_1.printCenter)(`Printed by: ${(0, utils_1.getFullName)(user)}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    // Footer
    commands.push(...(0, helper_escpos_2.generateReceiptFooterCommands)(siteSettings));
    commands.push((0, helper_escpos_1.printCenter)('This Document Is Not Valid For Claim Of Input Tax'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Thank You!'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
exports.printZReadReportNative = printZReadReportNative;
