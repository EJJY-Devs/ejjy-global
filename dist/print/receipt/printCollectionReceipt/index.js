"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCollectionReceipt = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printCollectionReceipt_native_1 = require("./printCollectionReceipt.native");
const printCollectionReceipt_html_1 = require("./printCollectionReceipt.html");
const printCollectionReceipt = (printCollectionReceiptDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    if (printCollectionReceiptDetails.isPdf) {
        return (0, printCollectionReceipt_html_1.printCollectionReceiptHtml)(printCollectionReceiptDetails) || '';
    }
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printCollectionReceipt_html_1.printCollectionReceiptHtml)(printCollectionReceiptDetails) || '';
        if (!printCollectionReceiptDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'Collection Receipt', undefined, printingType);
        }
        return data;
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printCollectionReceipt_native_1.printCollectionReceiptNative)(printCollectionReceiptDetails);
        if (!printCollectionReceiptDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'Collection Receipt', undefined, printingType);
        }
        return undefined;
    }
    return undefined;
};
exports.printCollectionReceipt = printCollectionReceipt;
