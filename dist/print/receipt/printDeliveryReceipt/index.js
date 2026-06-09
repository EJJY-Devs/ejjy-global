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
    if (printingType === globals_1.printingTypes.HTML) {
        const data = (0, printDeliveryReceipt_html_1.printDeliveryReceiptHtml)(printDeliveryReceiptDetails) || '';
        if (!printDeliveryReceiptDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'Delivery Receipt', undefined, printingType);
        }
        return data;
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        const data = (0, printDeliveryReceipt_native_1.printDeliveryReceiptNative)(printDeliveryReceiptDetails);
        if (!printDeliveryReceiptDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'Delivery Receipt', undefined, printingType);
        }
        return undefined;
    }
    return undefined;
};
exports.printDeliveryReceipt = printDeliveryReceipt;
