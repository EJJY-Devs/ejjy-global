"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOrderOfPaymentNative = void 0;
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printOrderOfPaymentNative = ({ orderOfPayment, }) => {
    var _a, _b;
    const commands = [];
    const opNo = orderOfPayment.id;
    const date = (0, utils_1.formatDate)(orderOfPayment.datetime_created);
    const payor = (0, utils_1.getFullName)(orderOfPayment.payor);
    const address = orderOfPayment.payor.home_address;
    const amount = (0, utils_1.formatInPeso)(orderOfPayment.amount, helper_receipt_1.PESO_SIGN);
    const invoiceId = ((_b = (_a = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction) === null || _a === void 0 ? void 0 : _a.invoice) === null || _b === void 0 ? void 0 : _b.or_number) || '';
    const invoiceDate = (orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction)
        ? (0, utils_1.formatDateTime)(orderOfPayment.charge_sales_transaction.invoice.datetime_created)
        : '';
    let purposeDescription = orderOfPayment.extra_description;
    if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        purposeDescription = 'Partial Payment';
    }
    else if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
        purposeDescription = 'Full Payment';
    }
    // Header
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_CENTER);
    commands.push('Entity Name: EJ & JY WET MARKET AND ENTERPRISES');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_LEFT);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // OP No and Date
    commands.push(`OP No: ${opNo}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(`Date: ${date}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Title
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_CENTER);
    commands.push(escpos_enum_1.EscPosCommands.BOLD_ON);
    commands.push('ORDER OF PAYMENT');
    commands.push(escpos_enum_1.EscPosCommands.BOLD_OFF);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_LEFT);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Addressee
    commands.push('The Cashier');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push('Cashiering Unit');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Main content
    commands.push('Please issue Collection Receipt in favor of:');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(`Payor: ${payor}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(`Address: ${address}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(`Amount: ${amount}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(`Payment of: ${purposeDescription}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(`Charge Invoice No: ${invoiceId}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(`Dated: ${invoiceDate}`);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Signature line
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_RIGHT);
    commands.push('_____________________________');
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push('Manager/Authorized Official');
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_LEFT);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
exports.printOrderOfPaymentNative = printOrderOfPaymentNative;
