"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printProductPriceTagNative = void 0;
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const escpos_enum_1 = require("../../utils/escpos.enum");
// Default ESC/POS line spacing is 1/6 inch (~4.23mm) per line at normal
// character height; double-height text takes roughly twice that.
const LINE_HEIGHT_MM = 4.23;
const printProductPriceTagNative = (product, _siteSettings, paperSettings) => {
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
    let usedHeightMm = hasMultipleLines
        ? nameLines.length * LINE_HEIGHT_MM
        : 2 * LINE_HEIGHT_MM;
    for (const line of nameLines) {
        commands.push(line);
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    // Price — double height, normal width (letters stay close together)
    commands.push(escpos_enum_1.EscPosCommands.TEXT_DOUBLE_HEIGHT);
    commands.push(price);
    commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    usedHeightMm += 2 * LINE_HEIGHT_MM;
    // Reset
    commands.push(escpos_enum_1.EscPosCommands.TEXT_NORMAL_SIZE);
    // Feed exactly enough to fill out the configured tag height so the next
    // tag's content starts on the next physical tag instead of drifting out
    // of alignment with the die-cut boundaries.
    const remainingMm = Math.max(0, paperSettings.paperHeight - usedHeightMm);
    const feedLines = Math.max(1, Math.round(remainingMm / LINE_HEIGHT_MM));
    for (let i = 0; i < feedLines; i += 1) {
        commands.push(escpos_enum_1.EscPosCommands.LINE_BREAK);
    }
    return commands;
};
exports.printProductPriceTagNative = printProductPriceTagNative;
