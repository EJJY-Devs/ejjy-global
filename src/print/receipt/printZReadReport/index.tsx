import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printZReadReportNative } from './printZReadReport.native';
import { printZReadReportHtml } from './printZReadReport.html';
import { PrintZReadReport } from './types';

export const printXReadReport = (printZReadReportDetails: PrintZReadReport) => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printZReadReportHtml(printZReadReportDetails) || '';
	} else if (printingType === printingTypes.NATIVE) {
		data = printZReadReportNative(printZReadReportDetails);
		console.log('native');
	}

	console.log('data', data);

	print(data, 'Sales Invoice', undefined, printingType);
};
