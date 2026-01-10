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

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printOrderOfPaymentHtml(printOrderOfPaymentDetails) || '';
		print(data as string, 'Order of Payment', undefined, printingType);
		return data as string; // ✅ return HTML string
	} else if (printingType === printingTypes.NATIVE) {
		data = printOrderOfPaymentNative(printOrderOfPaymentDetails);
		print(data, 'Order of Payment', undefined, printingType);
		return undefined;
	}

	return undefined;
};
