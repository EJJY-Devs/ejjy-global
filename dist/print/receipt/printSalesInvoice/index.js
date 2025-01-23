"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSalesInvoice = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printSalesInvoice_escpos_1 = require("./printSalesInvoice.escpos");
const printSalesInvoice_html_1 = require("./printSalesInvoice.html");
const printSalesInvoice = (printSalesInvoiceDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    console.log('printingType', printingType);
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printSalesInvoice_html_1.printSalesInvoiceHtml)(printSalesInvoiceDetails);
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printSalesInvoice_escpos_1.printSalesInvoiceEscPos)(printSalesInvoiceDetails);
    }
    (0, helper_receipt_1.print)(data, 'Sales Invoice', undefined, printingType);
};
exports.printSalesInvoice = printSalesInvoice;
