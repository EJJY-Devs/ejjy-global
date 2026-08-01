"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeliveryInvoiceNative = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const helper_escpos_1 = require("../../helper-escpos");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printDeliveryInvoiceNative = ({ deliveryInvoice, siteSettings, isReprint = false, }) => {
    const commands = [escpos_enum_1.EscPosCommands.INITIALIZE, '\n'];
    try {
        commands.push(...generateDeliveryInvoiceContentCommands(deliveryInvoice, siteSettings, isReprint));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.LINE_BREAK, escpos_enum_1.EscPosCommands.FEED_LINES);
        return commands;
    }
    catch (error) {
        console.error('Error generating delivery invoice commands:', error);
        return [
            escpos_enum_1.EscPosCommands.INITIALIZE,
            'Error generating invoice content',
            escpos_enum_1.EscPosCommands.LINE_BREAK,
            escpos_enum_1.EscPosCommands.LINE_BREAK,
        ];
    }
};
exports.printDeliveryInvoiceNative = printDeliveryInvoiceNative;
const generateDeliveryInvoiceContentCommands = (deliveryInvoice, siteSettings, isReprint) => {
    var _a;
    const commands = [];
    const totalAmount = ((_a = deliveryInvoice === null || deliveryInvoice === void 0 ? void 0 : deliveryInvoice.products) === null || _a === void 0 ? void 0 : _a.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price_per_piece || 0), 0)) || 0;
    try {
        commands.push(...(0, helper_escpos_1.generateReceiptHeaderCommands)({
            branchMachine: deliveryInvoice.branch_machine,
            title: 'DELIVERY INVOICE',
        }));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(escpos_enum_1.EscPosCommands.ALIGN_LEFT);
        deliveryInvoice.products.forEach((item) => {
            var _a, _b;
            const productName = ((_a = item.product) === null || _a === void 0 ? void 0 : _a.print_details) || ((_b = item.product) === null || _b === void 0 ? void 0 : _b.name);
            const quantityAndPrice = `   ${item.quantity} @ ${(0, utils_1.formatInPeso)(item.price_per_piece, helper_receipt_1.PESO_SIGN)}`;
            const amount = (0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece), helper_receipt_1.PESO_SIGN);
            commands.push(productName);
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
            commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
                {
                    label: quantityAndPrice,
                    value: amount,
                    isIndented: true,
                },
            ]));
        });
        commands.push((0, helper_escpos_1.printRight)('----------------'));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: 'TOTAL AMOUNT',
                value: (0, utils_1.formatInPeso)(totalAmount, helper_receipt_1.PESO_SIGN),
            },
        ]));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push('GDT: ' + (0, utils_1.formatDateTime)(deliveryInvoice.created_at));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push('PDT: ' + (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(...(0, helper_escpos_1.generateItemBlockCommands)([
            {
                label: deliveryInvoice.or_number || helper_receipt_1.EMPTY_CELL,
                value: `${deliveryInvoice.products.length} item(s)`,
            },
        ]));
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        commands.push(...(0, helper_escpos_1.generateReceiptFooterCommands)(siteSettings));
        commands.push(escpos_enum_1.EscPosCommands.ALIGN_CENTER);
        if (isReprint) {
            commands.push(globals_1.REPRINT_ONLY_MESSAGE);
            commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        }
        commands.push(`${siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.thank_you_message}`);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
        return commands;
    }
    catch (error) {
        console.error('Error generating delivery invoice content:', error);
        return [
            escpos_enum_1.EscPosCommands.ALIGN_LEFT,
            'Error generating delivery invoice content',
            escpos_enum_1.EscPosCommands.LINE_BREAK,
        ];
    }
};
