"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSalesInvoiceEscPos = void 0;
const TransactionContent_1 = require("../../components/modals/ViewTransactionModal/TransactionContent");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const escpos_enum_1 = require("../utils/escpos.enum");
const printSalesInvoiceEscPos = (transaction, siteSettings, isReprint = false) => {
    const { title, fields, change, previousTransactionOrNumber, newTransactionOrNumber, } = (0, TransactionContent_1.getTransactionData)(transaction);
    const data = [
        escpos_enum_1.EscPosCommands.INITIALIZE,
        ...generateReceiptHeaderCommands({
            branchMachine: transaction.branch_machine,
            siteSettings,
            title,
        }),
    ];
    (0, helper_receipt_1.print)(data, 'Sales Invoice', undefined, {
        type: 'raw',
        format: 'command',
        flavor: 'plain',
    });
};
exports.printSalesInvoiceEscPos = printSalesInvoiceEscPos;
const generateReceiptHeaderCommands = ({ branchMachine, siteSettings, title, }) => {
    const { contact_number: contactNumber, address_of_tax_payer: location, proprietor, store_name: storeName, tax_type: taxType, tin, } = siteSettings;
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, } = branchMachine || {};
    const commands = [];
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_CENTER);
    if (storeName) {
        const lines = storeName.split('\n');
        for (const line of lines) {
            commands.push(line);
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
    }
    if (location) {
        const lines = location.split('\n');
        for (const line of lines) {
            commands.push(line);
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
    }
    if (contactNumber || name) {
        commands.push([contactNumber, name].filter(Boolean).join(' | '));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (proprietor) {
        commands.push(proprietor);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (taxType || tin) {
        commands.push([(0, utils_1.getTaxTypeDescription)(taxType), tin].filter(Boolean).join(' | '));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (machineID) {
        commands.push('MIN: ' + machineID);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (posTerminal) {
        commands.push('SN: ' + posTerminal);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (title) {
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(title);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    return commands;
};
