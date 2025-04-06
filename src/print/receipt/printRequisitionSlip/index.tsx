import { printingTypes } from '../../../globals';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printRequisitionSlipNative } from './printRequisitionSlip.native';
import { printRequisitionSlipHtml } from './printRequisitionSlip.html';
import { PrintRequisitionSlip } from './types';

export const printRequisitionSlip = (
	printRequisitionSlipDetails: PrintRequisitionSlip,
) => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printRequisitionSlipHtml(printRequisitionSlipDetails) || '';
	} else if (printingType === printingTypes.NATIVE) {
		data = printRequisitionSlipNative(printRequisitionSlipDetails);
		console.log('native');
	}

	console.log('data', data);

	print(data, 'Requisition Slip', undefined, printingType);
};
