"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printZReadReport = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const escPosToHtml_1 = require("../../utils/escPosToHtml");
const printZReadReport_native_1 = require("./printZReadReport.native");
const printZReadReport_html_1 = require("./printZReadReport.html");
const printZReadReport = (printZReadReportDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    if (printZReadReportDetails.isPdf) {
        return (0, escPosToHtml_1.escPosToHtml)((0, printZReadReport_native_1.printZReadReportNative)(printZReadReportDetails));
    }
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printZReadReport_html_1.printZReadReportHtml)(printZReadReportDetails) || '';
        if (!printZReadReportDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'ZRead Report', undefined, printingType);
        }
        return data;
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printZReadReport_native_1.printZReadReportNative)(printZReadReportDetails);
        if (!printZReadReportDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'ZRead Report', undefined, printingType);
        }
        return undefined;
    }
};
exports.printZReadReport = printZReadReport;
