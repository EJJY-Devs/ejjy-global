"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDailyItemSold = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printDailyItemSold_native_1 = require("./printDailyItemSold.native");
const printDailyItemSold_html_1 = require("./printDailyItemSold.html");
const printDailyItemSold = (printDailyItemSoldDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printDailyItemSold_html_1.printDailyItemSoldHtml)(printDailyItemSoldDetails) || '';
        (0, helper_receipt_1.print)(data, 'Daily Item Sold Summary', undefined, printingType);
        return data; // ✅ return HTML string
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printDailyItemSold_native_1.printDailyItemSoldNative)(printDailyItemSoldDetails);
        (0, helper_receipt_1.print)(data, 'Daily Item Sold Summary', undefined, printingType);
        return undefined;
    }
    return undefined;
};
exports.printDailyItemSold = printDailyItemSold;
