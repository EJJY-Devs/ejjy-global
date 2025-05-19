import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printReceivingReportHtml } from './printReceivingReport.html';
import { printReceivingReportNative } from './printReceivingReport.native';
import { PrintReceivingReport } from './types';

export const printReceivingReport = (
	printReceivingReportDetails: PrintReceivingReport,
) => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printReceivingReportHtml(printReceivingReportDetails) || '';
	} else if (printingType === printingTypes.NATIVE) {
		data = printReceivingReportNative(printReceivingReportDetails);
	}

	// Only call print if NOT generating PDF
	if (!printReceivingReportDetails.isPdf) {
		print(data, 'Receiving Report', undefined, printingType);
	}

	// Return data for PDF generation or other uses
	return data;
};
