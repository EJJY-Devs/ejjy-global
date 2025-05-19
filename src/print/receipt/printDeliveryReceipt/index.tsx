import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printDeliveryReceiptHtml } from './printDeliveryReceipt.html';
import { printDeliveryReceiptNative } from './printDeliveryReceipt.native';
import { PrintDeliveryReceipt } from './types';

export const printDeliveryReceipt = (
	printDeliveryReceiptDetails: PrintDeliveryReceipt,
) => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printDeliveryReceiptHtml(printDeliveryReceiptDetails) || '';
	} else if (printingType === printingTypes.NATIVE) {
		data = printDeliveryReceiptNative(printDeliveryReceiptDetails);
	}

	print(data, 'Delivery Receipt', undefined, printingType);
};
