import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils';
import { print } from '../../helper-receipt';
import { printCashInHtml } from './printCashIn.html';
import { printCashInNative } from './printCashIn.native';

export const printCashIn = (
	params: Parameters<typeof printCashInHtml>[0],
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (params.isPdf) {
		return printCashInHtml(params) || '';
	}

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printCashInHtml(params) || '';
		print(data as string, 'Cash In', undefined, printingType);
		return data as string;
	} else if (printingType === printingTypes.NATIVE) {
		data = printCashInNative(params);
		print(data, 'Cash In', undefined, printingType);
		return undefined;
	}

	return undefined;
};
