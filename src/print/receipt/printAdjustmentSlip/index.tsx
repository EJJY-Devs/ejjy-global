import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printAdjustmentSlipNative } from './printAdjustmentSlip.native';
import { printAdjustmentSlipHtml } from './printAdjustmentSlip.html';
import { PrintAdjustmentSlip } from './types';

export const printAdjustmentSlip = (
	printAdjustmentSlipDetails: PrintAdjustmentSlip,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printAdjustmentSlipHtml(printAdjustmentSlipDetails) || '';
		if (!printAdjustmentSlipDetails.isPdf) {
			print(data as string, 'Adjustment Slip', undefined, printingType);
		}
		return data as string;
	} else if (printingType === printingTypes.NATIVE) {
		data = printAdjustmentSlipNative(printAdjustmentSlipDetails);
		if (!printAdjustmentSlipDetails.isPdf) {
			print(data, 'Adjustment Slip', undefined, printingType);
		}
		return undefined;
	}

	return undefined;
};
