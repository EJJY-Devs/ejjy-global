import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printDailySalesNative } from './printDailySales.native';
import { printDailySalesHtml } from './printDailySales.html';
import { PrintDailySales } from './types';

export const printDailySales = (
	printDailySalesDetails: PrintDailySales,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printDailySalesHtml(printDailySalesDetails) || '';
		print(data, 'Daily Sales', undefined, printingType);
		return data; // ✅ return HTML string
	} else if (printingType === printingTypes.NATIVE) {
		data = printDailySalesNative(printDailySalesDetails);
		print(data, 'Daily Sales', undefined, printingType);
		return undefined;
	}

	return undefined;
};
