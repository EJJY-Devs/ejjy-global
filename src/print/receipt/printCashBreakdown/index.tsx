import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printCashBreakdownNative } from './printCashBreakdown.native';
import { printCashBreakdownHtml } from './printCashBreakdown.html';
import { PrintCashBreakdown } from './types';

export const printCashBreakdown = (
	printCashBreakdownDetails: PrintCashBreakdown,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printCashBreakdownHtml(printCashBreakdownDetails) || '';
		print(data as string, 'Cash Breakdown', undefined, printingType);
		return data as string; // ✅ return HTML string
	} else if (printingType === printingTypes.NATIVE) {
		data = printCashBreakdownNative(printCashBreakdownDetails);
		print(data, 'Cash Breakdown', undefined, printingType);
		return undefined;
	}

	return undefined;
};
