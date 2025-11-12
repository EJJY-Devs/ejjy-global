"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashOut = void 0;
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const printCashOut_html_1 = require("./printCashOut.html");
const printCashOut_native_1 = require("./printCashOut.native");
const printCashOut = (params) => {
    const printingType = (0, utils_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printCashOut_html_1.printCashOutHtml)(params) || '';
        (0, helper_receipt_1.print)(data, 'Cash Out', undefined, printingType);
        return data;
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printCashOut_native_1.printCashOutNative)(params);
        (0, helper_receipt_1.print)(data, 'Cash Out', undefined, printingType);
        return undefined;
    }
    return undefined;
};
exports.printCashOut = printCashOut;
