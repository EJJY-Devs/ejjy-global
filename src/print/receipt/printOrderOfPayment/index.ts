import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { escPosToHtml } from '../../utils/escPosToHtml';
import { printOrderOfPaymentNative } from './printOrderOfPayment.native';
import { printOrderOfPaymentHtml } from './printOrderOfPayment.html';
import { PrintOrderOfPayment } from './types';

export { PrintOrderOfPayment } from './types';

// Content width of the A4 1/2 crosswise PDF page (794px wide, 10px margins),
// so the receipt is centered on the landscape sheet.
const PDF_CONTENT_WIDTH_PX = 774;

export const printOrderOfPayment = (
	printOrderOfPaymentDetails: PrintOrderOfPayment,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (printOrderOfPaymentDetails.isPdf) {
		return escPosToHtml(printOrderOfPaymentNative(printOrderOfPaymentDetails), {
			widthPx: PDF_CONTENT_WIDTH_PX,
		});
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
