import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printDailySalesNative } from './printDailySales.native';
import { printDailySalesHtml } from './printDailySales.html';
import { PrintDailySales } from './types';

export const printDailySales = (printDailySalesDetails: PrintDailySales) => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printDailySalesHtml(printDailySalesDetails) || '';
	} else if (printingType === printingTypes.NATIVE) {
		data = printDailySalesNative(printDailySalesDetails);
		console.log('native');
	}

	console.log('data', data);

	print(data, 'Daily Sales', undefined, printingType);
};
