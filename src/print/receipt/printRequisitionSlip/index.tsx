import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printRequisitionSlipNative } from './printRequisitionSlip.native';
import { printRequisitionSlipHtml } from './printRequisitionSlip.html';
import { PrintRequisitionSlip } from './types';

export const printRequisitionSlip = (
	printRequisitionSlipDetails: PrintRequisitionSlip,
): string | undefined => {
	const printingType = getAppReceiptPrintingType();

	if (printingType === printingTypes.HTML) {
		const data = printRequisitionSlipHtml(printRequisitionSlipDetails) || '';
		if (!printRequisitionSlipDetails.isPdf) {
			print(data, 'Requisition Slip', undefined, printingType);
		}
		return data;
	} else if (printingType === printingTypes.NATIVE) {
		const data = printRequisitionSlipNative(printRequisitionSlipDetails);
		if (!printRequisitionSlipDetails.isPdf) {
			print(data, 'Requisition Slip', undefined, printingType);
		}
		return undefined;
	}

	return undefined;
};
