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
