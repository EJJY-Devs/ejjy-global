"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSalesInvoice = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printSalesInvoice_native_1 = require("./printSalesInvoice.native");
const printSalesInvoice_html_1 = require("./printSalesInvoice.html");
const printSalesInvoice = (printSalesInvoiceDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    console.log('printingType', printingType);
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printSalesInvoice_html_1.printSalesInvoiceHtml)(printSalesInvoiceDetails);
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printSalesInvoice_native_1.printSalesInvoiceNative)(printSalesInvoiceDetails);
    }
    console.log('data', data);
    (0, helper_receipt_1.print)(data, 'Sales Invoice', undefined, printingType);
};
exports.printSalesInvoice = printSalesInvoice;
