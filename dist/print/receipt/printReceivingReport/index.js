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
    if (printReceivingReportDetails.isPdf) {
        return (0, printReceivingReport_html_1.printReceivingReportHtml)(printReceivingReportDetails) || '';
    }
    if (printingType === globals_1.printingTypes.HTML) {
        const data = (0, printReceivingReport_html_1.printReceivingReportHtml)(printReceivingReportDetails) || '';
        if (!printReceivingReportDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'Receiving Report', undefined, printingType);
        }
        return data;
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        const data = (0, printReceivingReport_native_1.printReceivingReportNative)(printReceivingReportDetails);
        if (!printReceivingReportDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'Receiving Report', undefined, printingType);
        }
        return undefined;
    }
    return undefined;
};
exports.printReceivingReport = printReceivingReport;
