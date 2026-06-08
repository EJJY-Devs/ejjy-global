import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printUnsoldItemNative } from './printUnsoldItem.native';
import { printUnsoldItemHtml } from './printUnsoldItem.html';
import { PrintUnsoldItem } from './types';

export const printUnsoldItem = (
	printUnsoldItemDetails: PrintUnsoldItem,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (printingType === printingTypes.HTML) {
		const htmlData = printUnsoldItemHtml(printUnsoldItemDetails) || '';
		if (!printUnsoldItemDetails.isPdf) {
			print(htmlData, 'Unsold Item', undefined, printingType);
		}
		return htmlData;
	} else if (printingType === printingTypes.NATIVE) {
		const nativeData = printUnsoldItemNative(printUnsoldItemDetails);
		if (!printUnsoldItemDetails.isPdf) {
			print(nativeData, 'Unsold Item', undefined, printingType);
		}
		return undefined;
	}

	return undefined;
};
