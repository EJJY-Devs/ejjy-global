"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashOutNative = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const helper_escpos_1 = require("../../helper-escpos");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printCashOutNative = ({ cashOut, siteSettings, }) => {
    const metadata = cashOut.cash_out_metadata;
    const { payee, particulars, received_by: receivedBy, prepared_by_user: preparedByUser, } = metadata;
    const datetime = (0, utils_1.formatDateTime)(cashOut.datetime_created);
    const amount = (0, utils_1.formatInPeso)(metadata.amount, helper_receipt_1.PESO_SIGN);
    const preparedBy = (0, utils_1.getFullName)(metadata.prepared_by_user);
    const approvedBy = (0, utils_1.getFullName)(metadata.approved_by_user);
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        branchMachine: cashOut.branch_machine,
        title: 'DISBURSEMENT VOUCHER',
    }));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Cash Out Details
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'Payee:',
            value: payee || '',
        },
        {
            label: 'Particulars:',
            value: particulars || '',
        },
        {
            label: 'Amount:',
            value: amount,
        },
        {
            label: 'Received by:',
            value: receivedBy || '',
        },
        {
            label: 'Prepared by:',
            value: preparedBy,
        },
        {
            label: 'Approved by:',
            value: approvedBy,
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
            value: preparedByUser.employee_id,
        },
    ]));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(...(0, helper_escpos_1.generateReceiptFooterCommands)(siteSettings));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
exports.printCashOutNative = printCashOutNative;
