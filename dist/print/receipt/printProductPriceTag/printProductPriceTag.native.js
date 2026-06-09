"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printProductPriceTagNative = void 0;
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
const printProductPriceTagNative = (product, _siteSettings, _paperSettings) => {
    const commands = [];
    const nameText = product.price_tag_print_details || helper_receipt_1.EMPTY_CELL;
    const price = (0, utils_1.formatInPeso)(product.price_per_piece, helper_receipt_1.PESO_SIGN);
    const nameLines = nameText.split('\n');
    const hasMultipleLines = nameLines.length > 1;
    commands.push(escpos_enum_1.EscPosCommands.INITIALIZE);
    // Use double height for single-line names; normal size for multi-line so price is not cut off
    if (!hasMultipleLines) {
        commands.push(escpos_enum_1.EscPosCommands.TEXT_DOUBLE_HEIGHT);
    }
    for (const line of nameLines) {
        commands.push(line);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    // Price — double height, normal width (letters stay close together)
    commands.push(escpos_enum_1.EscPosCommands.TEXT_DOUBLE_HEIGHT);
    commands.push(price);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Reset
    commands.push(escpos_enum_1.EscPosCommands.TEXT_NORMAL_SIZE);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
exports.printProductPriceTagNative = printProductPriceTagNative;
