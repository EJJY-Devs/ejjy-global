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

	if (printCollectionReceiptDetails.isPdf) {
		return printCollectionReceiptHtml(printCollectionReceiptDetails) || '';
	}

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printCollectionReceiptHtml(printCollectionReceiptDetails) || '';
		if (!printCollectionReceiptDetails.isPdf) {
			print(data as string, 'Collection Receipt', undefined, printingType);
		}
		return data as string;
	} else if (printingType === printingTypes.NATIVE) {
		data = printCollectionReceiptNative(printCollectionReceiptDetails);
		if (!printCollectionReceiptDetails.isPdf) {
			print(data, 'Collection Receipt', undefined, printingType);
		}
		return undefined;
	}

	return undefined;
};
