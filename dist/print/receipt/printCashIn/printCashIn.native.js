"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCashInContentCommands = exports.printCashInNative = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const helper_escpos_1 = require("../../helper-escpos");
const constants_1 = require("./constants");
const escpos_enum_1 = require("../../utils/escpos.enum");
const REMARKS_LABEL = 'Remarks:';
// 40-char paper width minus label and minimum spacing
const REMARKS_LINE_WIDTH = 40 - REMARKS_LABEL.length - 3;
const wrapText = (text, width) => {
    const lines = [];
    let current = '';
    text.split(/\s+/).forEach((word) => {
        let remaining = word;
        while (remaining.length > width) {
            if (current) {
                lines.push(current);
                current = '';
            }
            lines.push(remaining.slice(0, width));
            remaining = remaining.slice(width);
        }
        if (!remaining)
            return;
        if (!current) {
            current = remaining;
        }
        else if (current.length + 1 + remaining.length <= width) {
            current += ` ${remaining}`;
        }
        else {
            lines.push(current);
            current = remaining;
        }
    });
    if (current)
        lines.push(current);
    return lines;
};
const generateRemarksItems = (remarks) => {
    const trimmed = remarks === null || remarks === void 0 ? void 0 : remarks.trim();
    if (!trimmed)
        return [];
    return wrapText(trimmed, REMARKS_LINE_WIDTH).map((value, index) => ({
        label: index === 0 ? REMARKS_LABEL : '',
        value,
    }));
};
const printCashInNative = ({ cashBreakdown, siteSettings, user, }) => [
    ...(0, exports.generateCashInContentCommands)(cashBreakdown, siteSettings, user),
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
];
exports.printCashInNative = printCashInNative;
const generateCashInContentCommands = (cashBreakdown, siteSettings, user) => {
    const metadata = cashBreakdown.cash_in_metadata;
    const { received_from: receivedFrom, particulars } = metadata;
    const datetime = (0, utils_1.formatDateTime)(cashBreakdown.datetime_created);
    const amount = (0, utils_1.formatInPeso)(metadata.amount, helper_receipt_1.PESO_SIGN);
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        branchMachine: cashBreakdown.branch_machine,
        title: constants_1.CASH_IN_VOUCHER_TITLE,
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Cash In Details
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'Received From:',
            value: receivedFrom || '',
        },
        {
            label: 'Particulars:',
            value: particulars || '',
        },
        {
            label: 'Amount:',
            value: amount,
        },
        ...generateRemarksItems(cashBreakdown.remarks),
    ]));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Footer
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'GDT:',
            value: datetime,
        },
        {
            label: 'PDT:',
            value: (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false),
        },
        {
            label: '',
            value: (user === null || user === void 0 ? void 0 : user.employee_id) || '',
        },
    ]));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateReceiptFooterCommands)(siteSettings));
    return commands;
};
exports.generateCashInContentCommands = generateCashInContentCommands;
