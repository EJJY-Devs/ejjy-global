import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printSalesInvoiceEscPos } from './printSalesInvoice.escpos';
import { printSalesInvoiceHtml } from './printSalesInvoice.html';
import { PrintSalesInvoice } from './types';

export const printSalesInvoice = (
	printSalesInvoiceDetails: PrintSalesInvoice,
) => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	console.log('printingType', printingType);
	if (printingType === printingTypes.HTML) {
		data = printSalesInvoiceHtml(printSalesInvoiceDetails);
	} else if (printingType === printingTypes.NATIVE) {
		data = printSalesInvoiceEscPos(printSalesInvoiceDetails);
	}

	print(data, 'Sales Invoice', undefined, printingType);
};
