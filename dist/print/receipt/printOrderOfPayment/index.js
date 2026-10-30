"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOrderOfPayment = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const escPosToHtml_1 = require("../../utils/escPosToHtml");
const printOrderOfPayment_native_1 = require("./printOrderOfPayment.native");
const printOrderOfPayment_html_1 = require("./printOrderOfPayment.html");
// Content width of the A4 1/2 crosswise PDF page (794px wide, 10px margins),
// so the receipt is centered on the landscape sheet.
const PDF_CONTENT_WIDTH_PX = 774;
const printOrderOfPayment = (printOrderOfPaymentDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    if (printOrderOfPaymentDetails.isPdf) {
        return (0, escPosToHtml_1.escPosToHtml)((0, printOrderOfPayment_native_1.printOrderOfPaymentNative)(printOrderOfPaymentDetails), {
            widthPx: PDF_CONTENT_WIDTH_PX,
            pageHeightPx: printOrderOfPaymentDetails.pdfPageHeight,
        });
    }
    let data = '';
    if (printingType === globals_1.printingTypes.HTML) {
        data = (0, printOrderOfPayment_html_1.printOrderOfPaymentHtml)(printOrderOfPaymentDetails) || '';
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        data = (0, printOrderOfPayment_native_1.printOrderOfPaymentNative)(printOrderOfPaymentDetails);
    }
    (0, helper_receipt_1.print)(data, 'Order of Payment', undefined, printingType);
    return printingType === globals_1.printingTypes.HTML ? data : undefined;
};
exports.printOrderOfPayment = printOrderOfPayment;
