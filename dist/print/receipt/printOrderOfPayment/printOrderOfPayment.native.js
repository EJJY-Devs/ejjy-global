"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOrderOfPaymentNative = void 0;
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printOrderOfPaymentNative = ({ orderOfPayment, }) => {
    var _a, _b, _c, _d, _e;
    const commands = [];
    const opNo = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.id;
    const date = (0, utils_1.formatDate)(orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.datetime_created);
    const payor = (0, utils_1.getFullName)(orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.payor);
    const address = (_a = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.payor) === null || _a === void 0 ? void 0 : _a.home_address;
    const amount = (0, utils_1.formatInPeso)(orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.amount, helper_receipt_1.PESO_SIGN);
    const invoiceId = ((_c = (_b = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction) === null || _b === void 0 ? void 0 : _b.invoice) === null || _c === void 0 ? void 0 : _c.or_number) || '';
    const invoiceDate = (orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction)
        ? (0, utils_1.formatDateTime)((_e = (_d = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.charge_sales_transaction) === null || _d === void 0 ? void 0 : _d.invoice) === null || _e === void 0 ? void 0 : _e.datetime_created)
        : '';
    let purposeDescription = orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.extra_description;
    if ((orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.purpose) === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        purposeDescription = 'Partial Payment';
    }
    else if ((orderOfPayment === null || orderOfPayment === void 0 ? void 0 : orderOfPayment.purpose) === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
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
