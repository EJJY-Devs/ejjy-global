"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printReceivingReport = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printReceivingReport_html_1 = require("./printReceivingReport.html");
const printReceivingReport_native_1 = require("./printReceivingReport.native");
const printReceivingReport = (printReceivingReportDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printReceivingReport_html_1.printReceivingReportHtml)(printReceivingReportDetails) || '';
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printReceivingReport_native_1.printReceivingReportNative)(printReceivingReportDetails);
    }
    // Only call print if NOT generating PDF
    if (!printReceivingReportDetails.isPdf) {
        (0, helper_receipt_1.print)(data, 'Receiving Report', undefined, printingType);
    }
    // Return data for PDF generation or other uses
    return data;
};
exports.printReceivingReport = printReceivingReport;
