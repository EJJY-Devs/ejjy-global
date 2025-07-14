import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printDailyItemSoldNative } from './printDailyItemSold.native';
import { printDailyItemSoldHtml } from './printDailyItemSold.html';
import { PrintDailyItemSold } from './types';

export const printDailyItemSold = (
	printDailyItemSoldDetails: PrintDailyItemSold,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printDailyItemSoldHtml(printDailyItemSoldDetails) || '';
		print(data, 'Daily Item Sold Summary', undefined, printingType);
		return data; // ✅ return HTML string
	} else if (printingType === printingTypes.NATIVE) {
		data = printDailyItemSoldNative(printDailyItemSoldDetails);
		print(data, 'Daily Item Sold Summary', undefined, printingType);
		return undefined;
	}

	return undefined;
};
