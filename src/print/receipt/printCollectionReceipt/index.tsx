import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printCollectionReceiptNative } from './printCollectionReceipt.native';
import { printCollectionReceiptHtml } from './printCollectionReceipt.html';
import { PrintCollectionReceipt } from './types';

export const printCollectionReceipt = (
	printCollectionReceiptDetails: PrintCollectionReceipt,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printCollectionReceiptHtml(printCollectionReceiptDetails) || '';
		print(data as string, 'Collection Receipt', undefined, printingType);
		return data as string; // ✅ return HTML string
	} else if (printingType === printingTypes.NATIVE) {
		data = printCollectionReceiptNative(printCollectionReceiptDetails);
		print(data, 'Collection Receipt', undefined, printingType);
		console.log('printCollectionReceiptNative data:', data);
		return undefined;
	}

	return undefined;
};
