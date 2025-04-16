"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateItemBlockCommands = exports.printRight = exports.printCenter = exports.generateReceiptFooterCommands = exports.generateReceiptHeaderCommands = void 0;
const utils_1 = require("../utils");
const escpos_enum_1 = require("./utils/escpos.enum");
const PAPER_CHARACTER_WIDTH = 40;
const generateReceiptHeaderCommands = ({ branchMachine, title, }) => {
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, branch, ptu_date_issued: ptuDateIssued, permit_to_use, } = branchMachine || {};
    const commands = [];
    if (branch === null || branch === void 0 ? void 0 : branch.store_name) {
        const lines = branch === null || branch === void 0 ? void 0 : branch.store_name.split('\n');
        for (const line of lines) {
            commands.push((0, exports.printCenter)(line));
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
    }
    if (branch === null || branch === void 0 ? void 0 : branch.store_address) {
        const lines = branch === null || branch === void 0 ? void 0 : branch.store_address.split('\n');
        for (const line of lines) {
            commands.push((0, exports.printCenter)(line));
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
    }
    if ((branch === null || branch === void 0 ? void 0 : branch.contact_number) || name) {
        commands.push((0, exports.printCenter)([branch === null || branch === void 0 ? void 0 : branch.contact_number, name].filter(Boolean).join(' | ')));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (branch === null || branch === void 0 ? void 0 : branch.proprietor) {
        commands.push((0, exports.printCenter)(branch === null || branch === void 0 ? void 0 : branch.proprietor));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if ((branch === null || branch === void 0 ? void 0 : branch.vat_type) || (branch === null || branch === void 0 ? void 0 : branch.tin)) {
        commands.push((0, exports.printCenter)([(0, utils_1.getTaxTypeDescription)(branch === null || branch === void 0 ? void 0 : branch.vat_type), branch === null || branch === void 0 ? void 0 : branch.tin]
            .filter(Boolean)
            .join(' | ')));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (machineID) {
        commands.push((0, exports.printCenter)(`MIN: ${machineID}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (posTerminal) {
        commands.push((0, exports.printCenter)(`SN: ${posTerminal}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (permit_to_use) {
        commands.push((0, exports.printCenter)(`PTU No: ${permit_to_use}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (ptuDateIssued) {
        commands.push((0, exports.printCenter)(`Date Issued: ${ptuDateIssued}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (title) {
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push((0, exports.printCenter)(title));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    return commands;
};
exports.generateReceiptHeaderCommands = generateReceiptHeaderCommands;
const generateReceiptFooterCommands = (siteSettings) => {
    const { software_developer: softwareDeveloper, software_developer_address: softwareDeveloperAddress, software_developer_tin: softwareDeveloperTin, pos_accreditation_number: posAccreditationNumber, pos_accreditation_date: posAccreditationDate, } = siteSettings;
    const commands = [];
    if (softwareDeveloper) {
        commands.push((0, exports.printCenter)(softwareDeveloper));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (softwareDeveloperAddress) {
        const lines = softwareDeveloperAddress.split('\n');
        for (const line of lines) {
            commands.push((0, exports.printCenter)(line));
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
    }
    if (softwareDeveloperTin) {
        commands.push((0, exports.printCenter)(softwareDeveloperTin));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (posAccreditationNumber) {
        commands.push((0, exports.printCenter)(`Acc No: ${posAccreditationNumber}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (posAccreditationDate) {
        commands.push((0, exports.printCenter)(`Date Issued: ${posAccreditationDate}`));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
exports.generateReceiptFooterCommands = generateReceiptFooterCommands;
const printLeftRight = (leftText, rightText) => {
    const leftTextLength = leftText.length;
    const rightTextLength = rightText.length;
    const spacesNeeded = PAPER_CHARACTER_WIDTH - (leftTextLength + rightTextLength);
    const spaces = ' '.repeat(Math.max(0, spacesNeeded));
    return leftText + spaces + rightText;
};
const printCenter = (text) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + ' ' + word).trim().length <= PAPER_CHARACTER_WIDTH) {
            currentLine += (currentLine ? ' ' : '') + word;
        }
        else {
            lines.push(centerLine(currentLine));
            currentLine = word;
        }
    }
    if (currentLine) {
        lines.push(centerLine(currentLine));
    }
    return lines.join('\n');
};
exports.printCenter = printCenter;
const centerLine = (line) => {
    const padding = Math.floor((PAPER_CHARACTER_WIDTH - line.length) / 2);
    return '\u0020'.repeat(Math.max(0, padding)) + line;
};
const printRight = (text) => {
    const textLength = text.length;
    const spacesNeeded = PAPER_CHARACTER_WIDTH - textLength;
    const spaces = ' '.repeat(Math.max(0, spacesNeeded));
    return spaces + text;
};
exports.printRight = printRight;
const generateItemBlockCommands = (items) => {
    const commands = [];
    items.forEach((item) => {
        let label = item.label;
        if (item.isIndented)
            label = `  ${label}`;
        let value = String(item.value);
        if (item.isParenthesized)
            value = `(${value})`;
        const spaceBetween = 2;
        const combinedLength = label.length + value.length + spaceBetween;
        if (combinedLength <= PAPER_CHARACTER_WIDTH) {
            // Single line: label + value with spacing
            const space = ' '.repeat(PAPER_CHARACTER_WIDTH - label.length - value.length);
            commands.push(label + space + value);
        }
        else {
            // Multi-line: label first, then value right-aligned
            const valueIndent = ' '.repeat(PAPER_CHARACTER_WIDTH - value.length);
            commands.push(label);
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
            commands.push(valueIndent + value);
        }
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    });
    return commands;
};
exports.generateItemBlockCommands = generateItemBlockCommands;
