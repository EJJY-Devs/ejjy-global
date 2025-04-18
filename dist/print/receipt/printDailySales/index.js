"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDailySales = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printDailySales_native_1 = require("./printDailySales.native");
const printDailySales_html_1 = require("./printDailySales.html");
const printDailySales = (printDailySalesDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printDailySales_html_1.printDailySalesHtml)(printDailySalesDetails) || '';
        (0, helper_receipt_1.print)(data, 'Daily Sales', undefined, printingType);
        return data; // ✅ return HTML string
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printDailySales_native_1.printDailySalesNative)(printDailySalesDetails);
        (0, helper_receipt_1.print)(data, 'Daily Sales', undefined, printingType);
        return undefined;
    }
    return undefined;
};
exports.printDailySales = printDailySales;
