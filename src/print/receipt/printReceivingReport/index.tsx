import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printReceivingReportHtml } from './printReceivingReport.html';
import { printReceivingReportNative } from './printReceivingReport.native';
import { PrintReceivingReport } from './types';

export const printReceivingReport = (
	printReceivingReportDetails: PrintReceivingReport,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (printingType === printingTypes.HTML) {
		const data = printReceivingReportHtml(printReceivingReportDetails) || '';
		if (!printReceivingReportDetails.isPdf) {
			print(data, 'Receiving Report', undefined, printingType);
		}
		return data;
	} else if (printingType === printingTypes.NATIVE) {
		const data = printReceivingReportNative(printReceivingReportDetails);
		if (!printReceivingReportDetails.isPdf) {
			print(data, 'Receiving Report', undefined, printingType);
		}
		return undefined;
	}

	return undefined;
};
