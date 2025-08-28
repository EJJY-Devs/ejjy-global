"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateThreeColumnLine = exports.generateItemBlockCommands = exports.printRight = exports.printCenter = exports.generateReceiptFooterCommands = exports.generateReceiptHeaderCommands = exports.generateReceiptHeaderCommandsV2 = void 0;
const utils_1 = require("../utils");
const escpos_enum_1 = require("./utils/escpos.enum");
const PAPER_CHARACTER_WIDTH = 40;
const generateReceiptHeaderCommandsV2 = ({ branchMachine, title, branchHeader, }) => {
    const { branch } = branchMachine || {};
    const branchInfo = branch !== null && branch !== void 0 ? branch : branchHeader;
    const commands = [];
    if (branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.store_name) {
        const lines = branchInfo.store_name.split('\n');
        for (const line of lines) {
            commands.push((0, exports.printCenter)(line));
        }
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.name) {
        commands.push((0, exports.printCenter)(branchInfo.name));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (title) {
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push((0, exports.printCenter)(title));
    }
    return commands;
};
exports.generateReceiptHeaderCommandsV2 = generateReceiptHeaderCommandsV2;
const generateReceiptHeaderCommands = ({ branchMachine, title, branchHeader, }) => {
    const { name, machine_identification_number: machineID, pos_terminal: posTerminal, branch, ptu_date_issued: ptuDateIssued, permit_to_use, } = branchMachine || {};
    const branchInfo = branch !== null && branch !== void 0 ? branch : branchHeader;
    const commands = [];
    // Initialize and set center alignment for header
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_CENTER);
    if (branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.store_name) {
        for (const line of branchInfo.store_name.split('\n')) {
            commands.push(line); // Let ESC/POS center alignment handle it
        }
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.store_address) {
        for (const line of branchInfo.store_address.split('\n')) {
            commands.push(line); // Let ESC/POS center alignment handle it
        }
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if ((branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.contact_number) || name) {
        commands.push([branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.contact_number, name].filter(Boolean).join(' | '));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.proprietor) {
        commands.push(branchInfo.proprietor); // Let ESC/POS center alignment handle it
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if ((branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.vat_type) || (branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.tin)) {
        commands.push([(0, utils_1.getTaxTypeDescription)(branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.vat_type), branchInfo === null || branchInfo === void 0 ? void 0 : branchInfo.tin]
            .filter(Boolean)
            .join(' | '));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (machineID) {
        commands.push(`MIN: ${machineID}`); // Let ESC/POS center alignment handle it
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (posTerminal) {
        commands.push(`SN: ${posTerminal}`); // Let ESC/POS center alignment handle it
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (permit_to_use) {
        commands.push(`PTU No: ${permit_to_use}`); // Let ESC/POS center alignment handle it
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (ptuDateIssued) {
        commands.push(`Date Issued: ${ptuDateIssued}`); // Let ESC/POS center alignment handle it
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (title) {
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(title); // Let ESC/POS center alignment handle it
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    // Reset to left alignment for content
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_LEFT);
    return commands;
};
exports.generateReceiptHeaderCommands = generateReceiptHeaderCommands;
const generateReceiptFooterCommands = (siteSettings) => {
    const { software_developer: softwareDeveloper, software_developer_address: softwareDeveloperAddress, software_developer_tin: softwareDeveloperTin, pos_accreditation_number: posAccreditationNumber, pos_accreditation_date: posAccreditationDate, } = siteSettings;
    const commands = [];
    // Set center alignment for footer
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_CENTER);
    if (softwareDeveloper) {
        commands.push(softwareDeveloper);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (softwareDeveloperAddress) {
        const lines = softwareDeveloperAddress.split('\n');
        for (const line of lines) {
            commands.push(line);
        }
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (softwareDeveloperTin) {
        commands.push(softwareDeveloperTin);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (posAccreditationNumber) {
        commands.push(`Acc No: ${posAccreditationNumber}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    if (posAccreditationDate) {
        commands.push(`Date Issued: ${posAccreditationDate}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Reset to left alignment
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_LEFT);
    return commands;
};
exports.generateReceiptFooterCommands = generateReceiptFooterCommands;
const printCenter = (text) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + ' ' + word).trim().length <= PAPER_CHARACTER_WIDTH) {
            currentLine += (currentLine ? ' ' : '') + word;
        }
        else {
            lines.push(currentLine.trim());
            currentLine = word;
        }
    }
    if (currentLine) {
        lines.push(currentLine.trim());
    }
    // Manually center the text using spaces
    const result = lines
        .map((line) => {
        const padding = Math.floor((PAPER_CHARACTER_WIDTH - line.length) / 2);
        return ' '.repeat(padding) + line;
    })
        .join('\n');
    return result;
};
exports.printCenter = printCenter;
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
        // Ensure minimum spacing between label and value
        const minSpacing = 3;
        const maxLabelLength = PAPER_CHARACTER_WIDTH - value.length - minSpacing;
        if (label.length <= maxLabelLength) {
            // Single line: label + spaces + value (right-aligned)
            const spacesNeeded = PAPER_CHARACTER_WIDTH - label.length - value.length;
            const space = ' '.repeat(Math.max(minSpacing, spacesNeeded));
            const line = label + space + value;
            commands.push(line);
        }
        else {
            // Multi-line: label first, then value right-aligned
            commands.push(label);
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
            const valueIndent = ' '.repeat(Math.max(0, PAPER_CHARACTER_WIDTH - value.length));
            commands.push(valueIndent + value);
        }
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    });
    return commands;
};
exports.generateItemBlockCommands = generateItemBlockCommands;
const generateThreeColumnLine = (leftText, centerText, rightText) => {
    const totalWidth = PAPER_CHARACTER_WIDTH;
    // Reserve space for center and right columns
    const rightWidth = Math.max(rightText.length, 8); // minimum 8 chars for quantity
    const centerWidth = Math.max(centerText.length, 4); // minimum 4 chars for unit
    const leftWidth = totalWidth - rightWidth - centerWidth - 2; // 2 spaces for padding
    // Truncate left text if it's too long
    const truncatedLeft = leftText.length > leftWidth
        ? leftText.substring(0, leftWidth - 1) + ''
        : leftText;
    // Pad the columns
    const leftPadded = truncatedLeft.padEnd(leftWidth);
    const centerPadded = centerText.padEnd(centerWidth);
    const rightPadded = rightText.padStart(rightWidth);
    return leftPadded + centerPadded + rightPadded;
};
exports.generateThreeColumnLine = generateThreeColumnLine;
