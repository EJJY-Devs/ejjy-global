"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateItemBlockCommands = exports.generateReceiptFooterCommands = exports.generateReceiptHeaderCommands = void 0;
const utils_1 = require("../utils");
const escpos_enum_1 = require("./utils/escpos.enum");
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
        commands.push(`MIN: ${machineID}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (posTerminal) {
        commands.push(`SN: ${posTerminal}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (title) {
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(title);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    return commands;
};
exports.generateReceiptHeaderCommands = generateReceiptHeaderCommands;
const generateReceiptFooterCommands = (siteSettings) => {
    const { software_developer: softwareDeveloper, software_developer_address: softwareDeveloperAddress, software_developer_tin: softwareDeveloperTin, pos_accreditation_number: posAccreditationNumber, pos_accreditation_date: posAccreditationDate, ptu_number: ptuNumber, ptu_date: ptuDate, } = siteSettings;
    const commands = [];
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_CENTER);
    if (softwareDeveloper) {
        commands.push(softwareDeveloper);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (softwareDeveloperAddress) {
        const lines = softwareDeveloperAddress.split('\n');
        for (const line of lines) {
            commands.push(line);
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
    }
    if (softwareDeveloperTin) {
        commands.push(softwareDeveloperTin);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (posAccreditationNumber) {
        commands.push(`Acc No: ${posAccreditationNumber}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    if (posAccreditationDate) {
        commands.push(`Date Issued: ${posAccreditationDate}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (ptuNumber) {
        commands.push(`PTU No: ${ptuNumber}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (ptuDate) {
        commands.push(`Date Issued: ${ptuDate}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    return commands;
};
exports.generateReceiptFooterCommands = generateReceiptFooterCommands;
const generateItemBlockCommands = (items) => {
    const commands = [];
    items.forEach((item) => {
        if (item.isIndented) {
            commands.push(escpos_enum_1.EscPosCommands.ALIGN_LEFT);
            commands.push(' '.repeat(4));
        }
        commands.push(item.label);
        let value = item.value;
        if (item.isParenthesized) {
            value = `(${value})`;
        }
        commands.push(escpos_enum_1.EscPosCommands.ALIGN_RIGHT);
        commands.push(value.toString());
        if (item.isUnderlined && typeof item.value === 'number' && item.value > 0) {
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
            commands.push('-----------');
        }
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    });
    return commands;
};
exports.generateItemBlockCommands = generateItemBlockCommands;
