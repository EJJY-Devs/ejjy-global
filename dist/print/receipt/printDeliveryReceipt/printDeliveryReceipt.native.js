"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeliveryReceiptNative = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const escpos_enum_1 = require("../../utils/escpos.enum");
const helper_escpos_1 = require("../../helper-escpos");
const helper_receipt_1 = require("../../helper-receipt");
const printDeliveryReceiptNative = ({ deliveryReceipt, isPdf, }) => {
    const commands = [
        ...generateDeliveryReceiptContentCommands(deliveryReceipt),
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
        escpos_enum_1.EscPosCommands.LINE_BREAK,
    ];
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(commands.join(''));
    }
    return commands;
};
exports.printDeliveryReceiptNative = printDeliveryReceiptNative;
const generateDeliveryReceiptContentCommands = (deliveryReceipt) => {
    var _a;
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommandsV2)({
        branchHeader: deliveryReceipt.branch,
        title: 'DELIVERY RECEIPT',
    }), escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Datetime Generated
    if (deliveryReceipt.datetime_created) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Datetime Generated:',
                value: (0, utils_1.formatDateTime)(deliveryReceipt.datetime_created),
            },
        ]));
    }
    // Receipt Info
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'Reference #:',
            value: deliveryReceipt.reference_number || helper_receipt_1.EMPTY_CELL,
        },
        {
            label: 'Vendor:',
            value: ((_a = deliveryReceipt.branch) === null || _a === void 0 ? void 0 : _a.name) || helper_receipt_1.EMPTY_CELL,
        },
        {
            label: 'Customer:',
            value: deliveryReceipt.customer_name || helper_receipt_1.EMPTY_CELL,
        },
        {
            label: 'Encoder:',
            value: (0, utils_1.getFullName)(deliveryReceipt.encoded_by) || helper_receipt_1.EMPTY_CELL,
        },
    ]));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Table Header (still done with generateItemBlockCommands)
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        { label: 'Product Name', value: 'Quantity' },
    ]));
    commands.push((0, helper_escpos_1.printRight)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Product list
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)(deliveryReceipt.products.map((item) => ({
        label: item.product.print_details || '',
        value: (0, utils_1.formatQuantity)(Number(item.quantity_returned), item.product),
    }))));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Print details
    commands.push((0, helper_escpos_1.printCenter)(`Print Details: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push((0, helper_escpos_1.printCenter)(`Remarks: ${deliveryReceipt.overall_remarks || ''}`));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
