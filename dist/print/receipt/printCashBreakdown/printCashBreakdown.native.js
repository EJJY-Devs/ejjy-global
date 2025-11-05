"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashBreakdownNative = void 0;
const utils_1 = require("../../../utils");
const globals_1 = require("../../../globals");
const helper_escpos_1 = require("../../helper-escpos");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printCashBreakdownNative = ({ cashBreakdown, siteSettings, user, }) => [
    ...generateCashBreakdownContentCommands(cashBreakdown, siteSettings, user),
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
];
exports.printCashBreakdownNative = printCashBreakdownNative;
const generateCashBreakdownContentCommands = (cashBreakdown, siteSettings, user) => {
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        branchMachine: cashBreakdown.branch_machine,
        title: (0, utils_1.getCashBreakdownTypeDescription)(cashBreakdown.category, cashBreakdown.type),
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Table headers
    commands.push((0, helper_escpos_1.generateThreeColumnLine)('DENOM', 'QTY', 'AMOUNT'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // COINS section
    commands.push('COINS');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    const breakdownCoins = [
        {
            label: 'P 0.25',
            quantity: cashBreakdown.coins_25,
            amount: 0.25 * cashBreakdown.coins_25,
        },
        {
            label: 'P 1.00',
            quantity: cashBreakdown.coins_1,
            amount: 1 * cashBreakdown.coins_1,
        },
        {
            label: 'P 5.00',
            quantity: cashBreakdown.coins_5,
            amount: 5 * cashBreakdown.coins_5,
        },
        {
            label: 'P 10.00',
            quantity: cashBreakdown.coins_10,
            amount: 10 * cashBreakdown.coins_10,
        },
        {
            label: 'P 20.00',
            quantity: cashBreakdown.coins_20,
            amount: 20 * cashBreakdown.coins_20,
        },
    ];
    breakdownCoins.forEach(({ label, quantity, amount }) => {
        if (quantity > 0) {
            commands.push((0, helper_escpos_1.generateThreeColumnLine)(label, quantity.toString(), (0, utils_1.formatInPeso)(amount, '')));
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
    });
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // BILLS section
    commands.push('BILLS');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    const breakdownBills = [
        {
            label: 'P 20.00',
            quantity: cashBreakdown.bills_20,
            amount: 20 * cashBreakdown.bills_20,
        },
        {
            label: 'P 50.00',
            quantity: cashBreakdown.bills_50,
            amount: 50 * cashBreakdown.bills_50,
        },
        {
            label: 'P 100.00',
            quantity: cashBreakdown.bills_100,
            amount: 100 * cashBreakdown.bills_100,
        },
        {
            label: 'P 200.00',
            quantity: cashBreakdown.bills_200,
            amount: 200 * cashBreakdown.bills_200,
        },
        {
            label: 'P 500.00',
            quantity: cashBreakdown.bills_500,
            amount: 500 * cashBreakdown.bills_500,
        },
        {
            label: 'P 1,000.00',
            quantity: cashBreakdown.bills_1000,
            amount: 1000 * cashBreakdown.bills_1000,
        },
    ];
    breakdownBills.forEach(({ label, quantity, amount }) => {
        if (quantity > 0) {
            commands.push((0, helper_escpos_1.generateThreeColumnLine)(label, quantity.toString(), (0, utils_1.formatInPeso)(amount, '')));
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
    });
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Total
    commands.push((0, helper_escpos_1.printCenter)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'TOTAL',
            value: (0, utils_1.formatInPeso)(cashBreakdown.total_amount, helper_receipt_1.PESO_SIGN),
        },
    ]));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Date and time
    commands.push(`GDT: ${(0, utils_1.formatDateTime)(cashBreakdown.datetime_created)}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Print details (user information)
    if (user) {
        const userName = `${user.first_name} ${user.last_name}`.trim();
        const userEmployee = user.employee_id ? ` (${user.employee_id})` : '';
        commands.push(`PU: ${userName}${userEmployee}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    // Remarks for specific categories
    if ((cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_IN ||
        cashBreakdown.category === globals_1.cashBreakdownCategories.PRINT_ONLY) &&
        cashBreakdown.remarks) {
        commands.push(`Remarks: ${cashBreakdown.remarks}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Footer
    commands.push(...(0, helper_escpos_1.generateReceiptFooterCommands)(siteSettings));
    return commands;
};
