"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashCollection = void 0;
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const printCashCollection_html_1 = require("./printCashCollection.html");
const printCashCollection_native_1 = require("./printCashCollection.native");
const printCashCollection = (params) => {
    const printingType = (0, utils_1.getAppReceiptPrintingType)();
    if (params.isPdf) {
        return (0, printCashCollection_html_1.printCashCollectionHtml)(params) || '';
    }
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printCashCollection_html_1.printCashCollectionHtml)(params) || '';
        (0, helper_receipt_1.print)(data, 'Cash Collection', undefined, printingType);
        return data;
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printCashCollection_native_1.printCashCollectionNative)(params);
        (0, helper_receipt_1.print)(data, 'Cash Collection', undefined, printingType);
        return undefined;
    }
    return undefined;
};
exports.printCashCollection = printCashCollection;
