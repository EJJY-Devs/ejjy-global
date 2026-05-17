"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printProductPriceTag = exports.printProductPriceTagHtml = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printProductPriceTag_html_1 = require("./printProductPriceTag.html");
const printProductPriceTag_native_1 = require("./printProductPriceTag.native");
var printProductPriceTag_html_2 = require("./printProductPriceTag.html");
Object.defineProperty(exports, "printProductPriceTagHtml", { enumerable: true, get: function () { return printProductPriceTag_html_2.printProductPriceTagHtml; } });
const printProductPriceTag = (product, siteSettings, paperSettings, onComplete) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printProductPriceTag_html_1.printProductPriceTagHtml)(product, siteSettings, paperSettings) || '';
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printProductPriceTag_native_1.printProductPriceTagNative)(product, siteSettings, paperSettings);
    }
    (0, helper_receipt_1.print)(data, 'Product Price Tag', onComplete, printingType);
    return printingType === globals_1.printingTypes.HTML ? data : undefined;
};
exports.printProductPriceTag = printProductPriceTag;
