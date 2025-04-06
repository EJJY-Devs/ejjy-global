"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printXReadReport = void 0;
const localstorage_1 = require("../../../utils/localstorage");
const printXReadReport = (printXReadReportDetails) => {
    const printingType = (0, localstorage_1.getAppReceiptPrintingType)();
    console.log('printXReadReportDetails:', printXReadReportDetails); // 🔍
    console.log(printingType);
    // let data: string | string[] = '';
    // if (printingType === printingTypes.HTML) {
    // 	data = printXReadReportHtml(printXReadReportDetails) || '';
    // 	print(data, 'XRead Report', undefined, printingType);
    // 	return data; // ✅ return HTML string
    // } else if (printingType === printingTypes.NATIVE) {
    // 	data = printXReadReportNative(printXReadReportDetails);
    // 	print(data, 'XRead Report', undefined, printingType);
    // 	// native printers don’t need to return anything
    // 	return undefined;
    // }
    return undefined;
};
exports.printXReadReport = printXReadReport;
