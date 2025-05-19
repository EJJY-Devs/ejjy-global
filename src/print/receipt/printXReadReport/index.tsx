import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printXReadReportNative } from './printXReadReport.native';
import { printXReadReportHtml } from './printXReadReport.html';
import { PrintXReadReport } from './types';

export const printXReadReport = (
	printXReadReportDetails: PrintXReadReport,
): string | string[] => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printXReadReportHtml(printXReadReportDetails) || '';
	} else if (printingType === printingTypes.NATIVE) {
		data = printXReadReportNative(printXReadReportDetails);
	}

	if (!printXReadReportDetails.isPdf) {
		print(data, 'XRead REport', undefined, printingType);
	}

	return data;
};
