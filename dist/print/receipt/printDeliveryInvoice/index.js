"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeliveryInvoice = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printDeliveryInvoice_native_1 = require("./printDeliveryInvoice.native");
const printDeliveryInvoice_html_1 = require("./printDeliveryInvoice.html");
const printDeliveryInvoice = (printDeliveryInvoiceDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    if (printDeliveryInvoiceDetails.isPdf) {
        return (0, printDeliveryInvoice_html_1.printDeliveryInvoiceHtml)(printDeliveryInvoiceDetails);
    }
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printDeliveryInvoice_html_1.printDeliveryInvoiceHtml)(printDeliveryInvoiceDetails);
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printDeliveryInvoice_native_1.printDeliveryInvoiceNative)(printDeliveryInvoiceDetails);
    }
    (0, helper_receipt_1.print)(data, 'Delivery Invoice', undefined, printingType);
    return printingType === globals_1.printingTypes.HTML ? data : undefined;
};
exports.printDeliveryInvoice = printDeliveryInvoice;
