import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printDeliveryReceiptHtml } from './printDeliveryReceipt.html';
import { printDeliveryReceiptNative } from './printDeliveryReceipt.native';
import { PrintDeliveryReceipt } from './types';

export const printDeliveryReceipt = (
	printDeliveryReceiptDetails: PrintDeliveryReceipt,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (printingType === printingTypes.HTML) {
		const data = printDeliveryReceiptHtml(printDeliveryReceiptDetails) || '';
		if (!printDeliveryReceiptDetails.isPdf) {
			print(data, 'Delivery Receipt', undefined, printingType);
		}
		return data;
	} else if (printingType === printingTypes.NATIVE) {
		const data = printDeliveryReceiptNative(printDeliveryReceiptDetails);
		if (!printDeliveryReceiptDetails.isPdf) {
			print(data, 'Delivery Receipt', undefined, printingType);
		}
		return undefined;
	}

	return undefined;
};
