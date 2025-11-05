"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printAdjustmentSlip = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printAdjustmentSlip_native_1 = require("./printAdjustmentSlip.native");
const printAdjustmentSlip_html_1 = require("./printAdjustmentSlip.html");
const printAdjustmentSlip = (printAdjustmentSlipDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printAdjustmentSlip_html_1.printAdjustmentSlipHtml)(printAdjustmentSlipDetails) || '';
        (0, helper_receipt_1.print)(data, 'Adjustment Slip', undefined, printingType);
        return data; // ✅ return HTML string
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printAdjustmentSlip_native_1.printAdjustmentSlipNative)(printAdjustmentSlipDetails);
        (0, helper_receipt_1.print)(data, 'Adjustment Slip', undefined, printingType);
        return undefined;
    }
    return undefined;
};
exports.printAdjustmentSlip = printAdjustmentSlip;
