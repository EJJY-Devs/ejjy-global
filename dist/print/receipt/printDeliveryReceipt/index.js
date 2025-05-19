"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeliveryReceipt = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printDeliveryReceipt_html_1 = require("./printDeliveryReceipt.html");
const printDeliveryReceipt_native_1 = require("./printDeliveryReceipt.native");
const printDeliveryReceipt = (printDeliveryReceiptDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printDeliveryReceipt_html_1.printDeliveryReceiptHtml)(printDeliveryReceiptDetails) || '';
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printDeliveryReceipt_native_1.printDeliveryReceiptNative)(printDeliveryReceiptDetails);
    }
    // Only call print if NOT generating PDF
    if (!printDeliveryReceiptDetails.isPdf) {
        (0, helper_receipt_1.print)(data, 'Delivery Receipt', undefined, printingType);
    }
    return data;
};
exports.printDeliveryReceipt = printDeliveryReceipt;
