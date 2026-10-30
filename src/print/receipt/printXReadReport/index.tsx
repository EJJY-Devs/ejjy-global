import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { escPosToHtml } from '../../utils/escPosToHtml';
import { printXReadReportNative } from './printXReadReport.native';
import { printXReadReportHtml } from './printXReadReport.html';
import { PrintXReadReport } from './types';

export const printXReadReport = (
	printXReadReportDetails: PrintXReadReport,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (printXReadReportDetails.isPdf) {
		return escPosToHtml(printXReadReportNative(printXReadReportDetails), {
			pageHeightPx: printXReadReportDetails.pdfPageHeight,
		});
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
