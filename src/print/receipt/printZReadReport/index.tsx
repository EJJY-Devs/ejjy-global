import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printZReadReportNative } from './printZReadReport.native';
import { printZReadReportHtml } from './printZReadReport.html';
import { PrintZReadReport } from './types';

export const printZReadReport = (
	printZReadReportDetails: PrintZReadReport,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printZReadReportHtml(printZReadReportDetails) || '';
		print(data, 'ZRead Report', undefined, printingType);
		return data; // ✅ Return HTML string
	} else if (printingType === printingTypes.NATIVE) {
		data = printZReadReportNative(printZReadReportDetails);
		print(data, 'ZRead Report', undefined, printingType);
		return undefined; // ✅ Native printing doesn't need to return anything
	}

	// fallback just in case
	return undefined;
};
