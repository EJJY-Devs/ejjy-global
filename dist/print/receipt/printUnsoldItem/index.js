"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printUnsoldItem = void 0;
const globals_1 = require("../../../globals");
const localstorage_1 = require("../../../utils/localstorage");
const helper_receipt_1 = require("../../helper-receipt");
const printUnsoldItem_native_1 = require("./printUnsoldItem.native");
const printUnsoldItem_html_1 = require("./printUnsoldItem.html");
const printUnsoldItem = (printUnsoldItemDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    if (printingType === globals_1.printingTypes.HTML) {
        const htmlData = (0, printUnsoldItem_html_1.printUnsoldItemHtml)(printUnsoldItemDetails) || '';
        (0, helper_receipt_1.print)(htmlData, 'Unsold Item', undefined, printingType);
        return htmlData; // ✅ return HTML string
    }
    else if (printingType === globals_1.printingTypes.NATIVE) {
        const nativeData = (0, printUnsoldItem_native_1.printUnsoldItemNative)(printUnsoldItemDetails);
        (0, helper_receipt_1.print)(nativeData, 'Unsold Item', undefined, printingType);
        return undefined;
    }
    return undefined;
};
exports.printUnsoldItem = printUnsoldItem;
