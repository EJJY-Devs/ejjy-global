"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printProductPriceTag = exports.printProductPriceTagHtml = void 0;
const globals_1 = require("../../../globals");
const helper_receipt_1 = require("../../helper-receipt");
const printProductPriceTag_html_1 = require("./printProductPriceTag.html");
var printProductPriceTag_html_2 = require("./printProductPriceTag.html");
Object.defineProperty(exports, "printProductPriceTagHtml", { enumerable: true, get: function () { return printProductPriceTag_html_2.printProductPriceTagHtml; } });
const printProductPriceTag = (product, siteSettings, paperSettings, onComplete) => {
    const data = (0, printProductPriceTag_html_1.printProductPriceTagHtml)(product, siteSettings, paperSettings) || '';
    (0, helper_receipt_1.print)(data, 'Product Price Tag', onComplete, globals_1.printingTypes.HTML);
    return data;
};
exports.printProductPriceTag = printProductPriceTag;
