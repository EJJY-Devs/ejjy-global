"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashBreakdownNative = void 0;
const utils_1 = require("../../../utils");
const globals_1 = require("../../../globals");
const helper_escpos_1 = require("../../helper-escpos");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printCashIn_native_1 = require("../printCashIn/printCashIn.native");
const printCashCollection_native_1 = require("../printCashCollection/printCashCollection.native");
const printCashBreakdownNative = ({ cashBreakdown, siteSettings, user, cashInDrawerSummary, }) => [
    ...generateCashBreakdownContentCommands(cashBreakdown, siteSettings, user, cashInDrawerSummary),
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
];
exports.printCashBreakdownNative = printCashBreakdownNative;
const generateCashBreakdownContentCommands = (cashBreakdown, siteSettings, user, cashInDrawerSummary) => {
    // Cash In and Cash Collection are voucher-style receipts, not
    // denomination (coins/bills) breakdowns — Opening Fund (start_session)
    // and Cash in Drawer (end_session) keep the denomination table below
    // untouched.
    if (cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_IN &&
        cashBreakdown.type === globals_1.cashBreakdownTypes.MID_SESSION) {
        return (0, printCashIn_native_1.generateCashInContentCommands)(cashBreakdown, siteSettings, user);
    }
    if (cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_BREAKDOWN &&
        cashBreakdown.type === globals_1.cashBreakdownTypes.MID_SESSION) {
        return (0, printCashCollection_native_1.generateCashCollectionContentCommands)(cashBreakdown, siteSettings, user);
    }
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
    const { coinsTotal, billsTotal, total } = (0, utils_1.getCashBreakdownTotals)(cashBreakdown);
    const pushDenominationSection = (title, denominations, subtotal) => {
        commands.push(title);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        denominations.forEach(({ key, value }) => {
            const quantity = cashBreakdown[key];
            if (quantity > 0) {
                commands.push((0, helper_escpos_1.generateThreeColumnLine)(`${helper_receipt_1.PESO_SIGN} ${(0, utils_1.formatInPeso)(value, '')}`, quantity.toString(), (0, utils_1.formatInPeso)(value * quantity, '')));
                commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
            }
        });
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: `${title} SUBTOTAL`,
                value: (0, utils_1.formatInPeso)(subtotal, helper_receipt_1.PESO_SIGN),
            },
        ]));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    };
    pushDenominationSection('COINS', utils_1.CASH_BREAKDOWN_COINS, coinsTotal);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    pushDenominationSection('BILLS', utils_1.CASH_BREAKDOWN_BILLS, billsTotal);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Total
    commands.push((0, helper_escpos_1.printCenter)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    const drawerTotals = (0, utils_1.getCashInDrawerTotals)(cashBreakdown, total, cashInDrawerSummary);
    if (drawerTotals) {
        const { ePayments, others, remittance } = drawerTotals;
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'TOTAL CASH ON HAND',
                value: (0, utils_1.formatInPeso)(total, helper_receipt_1.PESO_SIGN),
            },
            {
                label: 'TOTAL E-PAYMENTS',
                value: (0, utils_1.formatInPeso)(ePayments, helper_receipt_1.PESO_SIGN),
            },
            ...(others !== undefined
                ? [{ label: 'OTHERS', value: (0, utils_1.formatInPeso)(others, helper_receipt_1.PESO_SIGN) }]
                : []),
            {
                label: 'TOTAL REMITTANCE',
                value: (0, utils_1.formatInPeso)(remittance, helper_receipt_1.PESO_SIGN),
            },
        ]));
    }
    else {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'TOTAL',
                value: (0, utils_1.formatInPeso)(total, helper_receipt_1.PESO_SIGN),
            },
        ]));
    }
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
