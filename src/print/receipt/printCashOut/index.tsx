import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils';
import { print } from '../../helper-receipt';
import { printCashOutHtml } from './printCashOut.html';
import { printCashOutNative } from './printCashOut.native';

export const printCashOut = (
	params: Parameters<typeof printCashOutHtml>[0],
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printCashOutHtml(params) || '';
		print(data as string, 'Cash Out', undefined, printingType);
		return data as string;
	} else if (printingType === printingTypes.NATIVE) {
		data = printCashOutNative(params);
		print(data, 'Cash Out', undefined, printingType);
		return undefined;
	}

	return undefined;
};
