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

	if (printDailySalesDetails.isPdf) {
		return printDailySalesHtml(printDailySalesDetails) || '';
	}

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printDailySalesHtml(printDailySalesDetails) || '';
		if (!printDailySalesDetails.isPdf) {
			print(data, 'Daily Sales', undefined, printingType);
		}
		return data;
	} else if (printingType === printingTypes.NATIVE) {
		data = printDailySalesNative(printDailySalesDetails);
		if (!printDailySalesDetails.isPdf) {
			print(data, 'Daily Sales', undefined, printingType);
		}
		return undefined;
	}

	return undefined;
};
