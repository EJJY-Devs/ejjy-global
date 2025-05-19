"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRequisitionSlip = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printRequisitionSlip_native_1 = require("./printRequisitionSlip.native");
const printRequisitionSlip_html_1 = require("./printRequisitionSlip.html");
const printRequisitionSlip = (printRequisitionSlipDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printRequisitionSlip_html_1.printRequisitionSlipHtml)(printRequisitionSlipDetails) || '';
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printRequisitionSlip_native_1.printRequisitionSlipNative)(printRequisitionSlipDetails);
    }
    // Only call print if NOT generating PDF
    if (!printRequisitionSlipDetails.isPdf) {
        (0, helper_receipt_1.print)(data, 'Requisition Slip', undefined, printingType);
    }
    return data;
};
exports.printRequisitionSlip = printRequisitionSlip;
