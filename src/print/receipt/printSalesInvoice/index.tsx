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

	// Only call print if NOT generating PDF
	if (!printSalesInvoiceDetails.isPdf) {
		print(data, 'Sales Invoice', undefined, printingType);
	}

	return data;
};
