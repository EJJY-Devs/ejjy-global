"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printXReadReport = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printZReadReport_native_1 = require("./printZReadReport.native");
const printZReadReport_html_1 = require("./printZReadReport.html");
const printXReadReport = (printZReadReportDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printZReadReport_html_1.printZReadReportHtml)(printZReadReportDetails) || '';
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printZReadReport_native_1.printZReadReportNative)(printZReadReportDetails);
        console.log('native');
    }
    console.log('data', data);
    (0, helper_receipt_1.print)(data, 'Sales Invoice', undefined, printingType);
};
exports.printXReadReport = printXReadReport;
