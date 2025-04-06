"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printXReadReport = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printXReadReport_native_1 = require("./printXReadReport.native");
const printXReadReport_html_1 = require("./printXReadReport.html");
const printXReadReport = (printXReadReportDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    console.log('printXReadReportDetails:', printXReadReportDetails); // 🔍
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printXReadReport_html_1.printXReadReportHtml)(printXReadReportDetails) || '';
        (0, helper_receipt_1.print)(data, 'XRead Report', undefined, printingType);
        return data; // ✅ return HTML string
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printXReadReport_native_1.printXReadReportNative)(printXReadReportDetails);
        (0, helper_receipt_1.print)(data, 'XRead Report', undefined, printingType);
        // native printers don’t need to return anything
        return undefined;
    }
};
exports.printXReadReport = printXReadReport;
