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

	if (printXReadReportDetails.isPdf) {
		return printXReadReportHtml(printXReadReportDetails) || '';
	}

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printXReadReportHtml(printXReadReportDetails) || '';
		if (!printXReadReportDetails.isPdf) {
			print(data, 'XRead Report', undefined, printingType);
		}
		return data;
	} else if (printingType === printingTypes.NATIVE) {
		data = printXReadReportNative(printXReadReportDetails);
		if (!printXReadReportDetails.isPdf) {
			print(data, 'XRead Report', undefined, printingType);
		}
		return undefined;
	}
};
