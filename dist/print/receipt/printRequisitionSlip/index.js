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
    if (printRequisitionSlipDetails.isPdf) {
        return (0, printRequisitionSlip_html_1.printRequisitionSlipHtml)(printRequisitionSlipDetails) || '';
    }
    if (printingType === globals_1.printingTypes.HTML) {
        const data = (0, printRequisitionSlip_html_1.printRequisitionSlipHtml)(printRequisitionSlipDetails) || '';
        if (!printRequisitionSlipDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'Requisition Slip', undefined, printingType);
        }
        return data;
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        const data = (0, printRequisitionSlip_native_1.printRequisitionSlipNative)(printRequisitionSlipDetails);
        if (!printRequisitionSlipDetails.isPdf) {
            (0, helper_receipt_1.print)(data, 'Requisition Slip', undefined, printingType);
        }
        return undefined;
    }
    return undefined;
};
exports.printRequisitionSlip = printRequisitionSlip;
