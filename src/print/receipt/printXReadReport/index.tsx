import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printXReadReportNative } from './printXReadReport.native';
import { printXReadReportHtml } from './printXReadReport.html';
import { PrintXReadReport } from './types';

export const printXReadReport = (
	printXReadReportDetails: PrintXReadReport,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();
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
