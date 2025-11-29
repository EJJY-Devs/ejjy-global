"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printProductPriceTag = exports.printProductPriceTagHtml = void 0;
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const helper_receipt_2 = require("../helper-receipt");
const printProductPriceTagHtml = (product, siteSettings, paperSettings) => {
    var _a;
    const name = ((_a = product.price_tag_print_details) === null || _a === void 0 ? void 0 : _a.replace(/\n/g, '<br/>')) || helper_receipt_1.EMPTY_CELL;
    const price = (0, utils_1.formatInPeso)(product.price_per_piece, helper_receipt_1.PESO_SIGN);
    return `
	<div style="
    width: ${paperSettings.paperWidth}mm;
    height: ${Math.floor(paperSettings.paperHeight * 0.9)}mm;
    padding: 1mm 2mm 0 2mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: ${paperSettings.fontSize}px;
    font-family: ${paperSettings.fontFamily};
    line-height: 100%;
    color: black;
    overflow: hidden;
  ">
    <div style="max-height: 3.3em; overflow: hidden; font-size: 1em; line-height: 1.1em; word-wrap: break-word; overflow-wrap: break-word;">${name}</div>
    <div style="font-size: 1.53em; text-align: right; flex-shrink: 0; margin-top: auto;">${price}</div>
	</div>
	`;
};
exports.printProductPriceTagHtml = printProductPriceTagHtml;
const printProductPriceTag = (product, siteSettings, paperSettings, onComplete) => {
    const htmlData = (0, exports.printProductPriceTagHtml)(product, siteSettings, paperSettings);
    // Print the HTML data
    (0, helper_receipt_2.print)(htmlData, 'Product Price Tag', onComplete, 'HTML');
    return htmlData;
};
exports.printProductPriceTag = printProductPriceTag;
