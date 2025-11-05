"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashBreakdown = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printCashBreakdown_native_1 = require("./printCashBreakdown.native");
const printCashBreakdown_html_1 = require("./printCashBreakdown.html");
const printCashBreakdown = (printCashBreakdownDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printCashBreakdown_html_1.printCashBreakdownHtml)(printCashBreakdownDetails) || '';
        (0, helper_receipt_1.print)(data, 'Cash Breakdown', undefined, printingType);
        return data; // ✅ return HTML string
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printCashBreakdown_native_1.printCashBreakdownNative)(printCashBreakdownDetails);
        (0, helper_receipt_1.print)(data, 'Cash Breakdown', undefined, printingType);
        return undefined;
    }
    return undefined;
};
exports.printCashBreakdown = printCashBreakdown;
