import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printDeliveryInvoiceNative } from './printDeliveryInvoice.native';
import { printDeliveryInvoiceHtml } from './printDeliveryInvoice.html';
import { PrintDeliveryInvoice } from './types';

export const printDeliveryInvoice = (
	printDeliveryInvoiceDetails: PrintDeliveryInvoice,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (printDeliveryInvoiceDetails.isPdf) {
		return printDeliveryInvoiceHtml(printDeliveryInvoiceDetails);
	}

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printDeliveryInvoiceHtml(printDeliveryInvoiceDetails);
	} else if (printingType === printingTypes.NATIVE) {
		data = printDeliveryInvoiceNative(printDeliveryInvoiceDetails);
	}

	print(data, 'Delivery Invoice', undefined, printingType);

	return printingType === printingTypes.HTML ? (data as string) : undefined;
};
