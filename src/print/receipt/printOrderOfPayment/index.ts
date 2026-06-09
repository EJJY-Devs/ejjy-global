import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printOrderOfPaymentNative } from './printOrderOfPayment.native';
import { printOrderOfPaymentHtml } from './printOrderOfPayment.html';
import { PrintOrderOfPayment } from './types';

export { PrintOrderOfPayment } from './types';

export const printOrderOfPayment = (
	printOrderOfPaymentDetails: PrintOrderOfPayment,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (printOrderOfPaymentDetails.isPdf) {
		return printOrderOfPaymentHtml(printOrderOfPaymentDetails) || '';
	}

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printOrderOfPaymentHtml(printOrderOfPaymentDetails) || '';
	} else if (printingType === printingTypes.NATIVE) {
		data = printOrderOfPaymentNative(printOrderOfPaymentDetails);
	}

	print(data, 'Order of Payment', undefined, printingType);

	return printingType === printingTypes.HTML ? (data as string) : undefined;
};
