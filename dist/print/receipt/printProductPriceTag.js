"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printProductPriceTag = void 0;
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printProductPriceTag = (product, siteSettings, paperSettings) => {
    var _a;
    const productName = ((_a = (product.name || product.price_tag_print_details)) === null || _a === void 0 ? void 0 : _a.replace('\n', '<br/>')) ||
        helper_receipt_1.EMPTY_CELL;
    const price = (0, utils_1.formatInPeso)(product.price_per_piece, helper_receipt_1.PESO_SIGN);
    return `
	<div style="
    width: ${paperSettings.paperWidth}mm;
    height: ${paperSettings.paperHeight - 0.25}mm;
    padding: 1mm 1.5mm;
    display: flex;
    flex-direction: column;
    font-size: ${paperSettings.fontSize}px;
    font-family: ${paperSettings.fontFamily};
    line-height: 100%;
    color: black;
    overflow:hidden;
  ">
    <div style="height: 2.2em; overflow: hidden; font-size: 1em; line-height: 1.1em;">${productName}</div>
    <div style="width: 100%; margin: 4px 0; border-bottom: 0.25px solid black;"></div>
    <div style="font-size: 1.23em; text-align: right;">${price}</div>
    <div style="margin-top: auto; font-size: 0.46em; text-align: center; line-height: 100%;">${siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.store_name}</div>
	</div>
	`;
};
exports.printProductPriceTag = printProductPriceTag;
