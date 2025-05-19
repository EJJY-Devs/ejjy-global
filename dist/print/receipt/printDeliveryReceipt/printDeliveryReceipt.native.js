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
const printDeliveryReceiptNative = ({ deliveryReceipt, user, }) => [
    ...generateDeliveryReceiptContentCommands(deliveryReceipt, user),
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
    escpos_enum_1.EscPosCommands.LINE_BREAK,
];
exports.printDeliveryReceiptNative = printDeliveryReceiptNative;
const generateDeliveryReceiptContentCommands = (deliveryReceipt, user) => {
    const commands = [];
    // Header
    commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
        branchHeader: deliveryReceipt.branch,
        title: 'DELIVERY RECEIPT',
    }), escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Datetime created
    if (deliveryReceipt.datetime_created) {
        commands.push((0, helper_escpos_1.printCenter)('Date & Time Generated'));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push((0, helper_escpos_1.printCenter)((0, utils_1.formatDateTime)(deliveryReceipt.datetime_created)));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Customer Name
    if (deliveryReceipt.customer_name) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Customer',
                value: deliveryReceipt.customer_name,
            },
        ]));
    }
    // Encoder
    if (deliveryReceipt.encoded_by) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Encoder',
                value: (0, utils_1.getFullName)(deliveryReceipt.encoded_by) || '',
            },
        ]));
    }
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Table Header
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
        {
            label: 'Product Name',
            value: 'Quantity',
        },
    ]));
    commands.push((0, helper_escpos_1.printRight)('----------------------------------------'));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Product List
    commands.push(...(0, helper_escpos_1.generateItemBlockCommands)(deliveryReceipt.products.map(({ product, quantity_returned }) => ({
        label: product.name,
        value: (0, utils_1.formatQuantity)(Number(quantity_returned), product),
    }))));
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Remarks
    if (deliveryReceipt.overall_remarks) {
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'Remarks',
                value: deliveryReceipt.overall_remarks,
            },
        ]));
    }
    // Footer
    if (user) {
        commands.push((0, helper_escpos_1.printCenter)(`Print Details: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)} ${user.employee_id}`), escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    return commands;
};
