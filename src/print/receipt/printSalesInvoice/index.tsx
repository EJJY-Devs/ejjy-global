import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printSalesInvoiceNative } from './printSalesInvoice.native';
import { printSalesInvoiceHtml } from './printSalesInvoice.html';
import { PrintSalesInvoice } from './types';

export const printSalesInvoice = (
	printSalesInvoiceDetails: PrintSalesInvoice,
) => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printSalesInvoiceHtml(printSalesInvoiceDetails);
	} else if (printingType === printingTypes.NATIVE) {
		data = printSalesInvoiceNative(printSalesInvoiceDetails);
	}

	console.log('data', data);

	print(data, 'Sales Invoice', undefined, printingType);
};
