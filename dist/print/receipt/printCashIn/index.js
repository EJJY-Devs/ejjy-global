"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashIn = void 0;
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const printCashIn_html_1 = require("./printCashIn.html");
const printCashIn_native_1 = require("./printCashIn.native");
const printCashIn = (params) => {
    const printingType = (0, utils_1.getAppReceiptPrintingType)();
    if (params.isPdf) {
        return (0, printCashIn_html_1.printCashInHtml)(params) || '';
    }
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printCashIn_html_1.printCashInHtml)(params) || '';
        (0, helper_receipt_1.print)(data, 'Cash In', undefined, printingType);
        return data;
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printCashIn_native_1.printCashInNative)(params);
        (0, helper_receipt_1.print)(data, 'Cash In', undefined, printingType);
        return undefined;
    }
    return undefined;
};
exports.printCashIn = printCashIn;
