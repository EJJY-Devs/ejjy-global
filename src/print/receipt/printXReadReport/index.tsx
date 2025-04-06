import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printXReadReportNative } from './printXReadReport.native';
import { printXReadReportHtml } from './printXReadReport.html';
import { PrintXReadReport } from './types';

export const printXReadReport = (printXReadReportDetails: PrintXReadReport) => {
	const printingType = getAppReceiptPrintingType();

	console.log('printingType', printingType);

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printXReadReportHtml(printXReadReportDetails) || '';
		console.log('html');
	} else if (printingType === printingTypes.NATIVE) {
		data = printXReadReportNative(printXReadReportDetails);
		console.log('native');
	}

	console.log('data', data);

	print(data, 'Sales Invoice', undefined, printingType);
};
