import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printZReadReportNative } from './printZReadReport.native';
import { printZReadReportHtml } from './printZReadReport.html';
import { PrintZReadReport } from './types';

export const printZReadReport = (
	printZReadReportDetails: PrintZReadReport,
): string | string[] => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printZReadReportHtml(printZReadReportDetails) || '';
	} else if (printingType === printingTypes.NATIVE) {
		data = printZReadReportNative(printZReadReportDetails);
	}

	if (!printZReadReportDetails.isPdf) {
		print(data, 'ZRead Report', undefined, printingType);
	}

	return data;
};
