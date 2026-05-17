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
    // Initialize printer
    commands.push(escpos_enum_1.EscPosCommands.INITIALIZE);
    // Print name lines
    const nameLines = nameText.split('\n');
    for (const line of nameLines) {
        commands.push(line);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    // Print price — right-aligned, double size
    commands.push(escpos_enum_1.EscPosCommands.TEXT_DOUBLE);
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_RIGHT);
    commands.push(price);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    // Reset
    commands.push(escpos_enum_1.EscPosCommands.TEXT_NORMAL_SIZE);
    commands.push(escpos_enum_1.EscPosCommands.ALIGN_LEFT);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    return commands;
};
exports.printProductPriceTagNative = printProductPriceTagNative;
