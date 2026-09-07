import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils';
import { print } from '../../helper-receipt';
import { printCashCollectionHtml } from './printCashCollection.html';
import { printCashCollectionNative } from './printCashCollection.native';

export const printCashCollection = (
	params: Parameters<typeof printCashCollectionHtml>[0],
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (params.isPdf) {
		return printCashCollectionHtml(params) || '';
	}

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printCashCollectionHtml(params) || '';
		print(data as string, 'Cash Collection', undefined, printingType);
		return data as string;
	} else if (printingType === printingTypes.NATIVE) {
		data = printCashCollectionNative(params);
		print(data, 'Cash Collection', undefined, printingType);
		return undefined;
	}

	return undefined;
};
