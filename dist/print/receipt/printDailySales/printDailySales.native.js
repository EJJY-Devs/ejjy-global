"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDailySalesNative = void 0;
const utils_1 = require("../../../utils");
const helper_escpos_1 = require("../../helper-escpos");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printDailySalesNative = ({ dailySales, siteSettings, user, }) => {
    var _a, _b;
    const commands = [];
    commands.push(' ');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(' ');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    const openDatetime = dailySales.daily_sales_data.branch_day_open_datetime;
    const generationDatetime = dailySales.generation_datetime;
    const openTime = openDatetime ? (0, utils_1.formatTime)(openDatetime) : '';
    const closeTime = generationDatetime ? (0, utils_1.formatTime)(generationDatetime) : '';
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        branchMachine: dailySales.branch_machine,
        title: 'DAILY SALES REPORT',
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    if (generationDatetime) {
        commands.push((0, helper_escpos_1.printCenter)('Report Generation Datetime'));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push((0, helper_escpos_1.printCenter)(`${(0, utils_1.formatDate)(generationDatetime)} - ${(0, utils_1.formatTime)(generationDatetime)}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push((0, helper_escpos_1.printCenter)('Day Datetime'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)(`${(0, utils_1.formatDate)(openDatetime || '')} | ${[openTime, closeTime].filter(Boolean).join(' - ')}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'Beg Sales Invoice #:',
            value: ((_a = dailySales.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || '',
        },
        {
            label: 'End Sales Invoice #:',
            value: ((_b = dailySales.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || '',
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Sales Breakdown'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
        { label: 'Zero Rated Sales', value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN) },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Deductions'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
        { label: '+Return', value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN) },
        { label: '+Void', value: (0, utils_1.formatInPeso)(dailySales.void, helper_receipt_1.PESO_SIGN) },
        {
            label: '=Total',
            value: (0, utils_1.formatInPeso)(dailySales.total_deductions, helper_receipt_1.PESO_SIGN),
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('VAT Adjustment'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
        { label: '+VAT on Returns', value: (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN) },
        {
            label: '+Others',
            value: (0, utils_1.formatInPeso)(dailySales.vat_others, helper_receipt_1.PESO_SIGN),
        },
        {
            label: '=Total',
            value: (0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN),
        },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('VAT Payable'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Payment Received'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Cash on Hand'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: '+Payment Received',
            value: (0, utils_1.formatInPeso)(dailySales.total_payment_received, helper_receipt_1.PESO_SIGN),
        },
        {
            label: '+Opening fund',
            value: (0, utils_1.formatInPeso)(dailySales.opening_fund, helper_receipt_1.PESO_SIGN),
        },
        { label: '+Cash In', value: (0, utils_1.formatInPeso)(dailySales.cash_in, helper_receipt_1.PESO_SIGN) },
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
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Transaction Summary'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    const shortOverVal = (dailySales.short_over < 0 ? '(' : '') +
        (0, utils_1.formatInPeso)(Math.abs(dailySales.short_over), helper_receipt_1.PESO_SIGN) +
        (dailySales.short_over < 0 ? ')' : '');
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: '+Cash in Drawer',
            value: (0, utils_1.formatInPeso)(dailySales.cash_in_drawer, helper_receipt_1.PESO_SIGN),
        },
        {
            label: '-Cash on Hand',
            value: (0, utils_1.formatInPeso)(dailySales.total_cash_on_hand, helper_receipt_1.PESO_SIGN),
        },
        { label: '=(Short)/Over', value: shortOverVal },
    ]));
    commands.push((0, helper_escpos_1.printCenter)('----------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    if (user) {
        commands.push((0, helper_escpos_1.printCenter)(`Printed by: ${(0, utils_1.getFullName)(user)}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(...(0, helper_escpos_1.generateReceiptFooterCommands)(siteSettings));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('This Document Is Not Valid For Claim Of Input Tax'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('Thank You!'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(' ');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(' ');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
exports.printDailySalesNative = printDailySalesNative;
