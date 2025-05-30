import dayjs from 'dayjs';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintRequisitionSlip } from './types';
import {
	generateItemBlockCommands,
	generateReceiptHeaderCommandsV2,
	printCenter,
	printRight,
} from '../../helper-escpos';
import { appendHtmlElement } from '../../helper-receipt';

export const printRequisitionSlipNative = ({
	requisitionSlip,
	isPdf,
}: PrintRequisitionSlip): string[] | string => {
	const commands = [
		...generateRequisitionSlipContentCommands(requisitionSlip),
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
	];

	if (isPdf) {
		return appendHtmlElement(commands.join(''));
	}

	return commands;
};

const generateRequisitionSlipContentCommands = (
	requisitionSlip: PrintRequisitionSlip['requisitionSlip'],
): string[] => {
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommandsV2({
			branchHeader: requisitionSlip.branch,
			title: 'REQUISITION SLIP',
		}),
		EscPosCommands.LINE_BREAK,
	);

	// Date & Time Requested
	if (requisitionSlip.datetime_created) {
		commands.push(printCenter('Datetime Requested:'));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			printCenter(formatDateTime(requisitionSlip.datetime_created)),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(EscPosCommands.LINE_BREAK);

	// Reference Number
	if (requisitionSlip.reference_number) {
		commands.push(
			...generateItemBlockCommands([
				{ label: 'Reference #:', value: requisitionSlip.reference_number },
			]),
		);
	}

	// Vendor
	if (requisitionSlip.vendor) {
		commands.push(
			...generateItemBlockCommands([
				{ label: 'Vendor:', value: requisitionSlip.vendor.name || '' },
			]),
		);
	}

	// Customer (Branch Name)
	if (requisitionSlip.branch) {
		commands.push(
			...generateItemBlockCommands([
				{ label: 'Customer:', value: requisitionSlip.branch.name || '' },
			]),
		);
	}

	// Encoder (Prepared By)
	if (requisitionSlip.prepared_by) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Encoder:',
					value: getFullName(requisitionSlip.prepared_by) || '',
				},
			]),
		);
	}

	commands.push(EscPosCommands.LINE_BREAK);

	// Table Header
	commands.push(
		...generateItemBlockCommands([
			{ label: 'Product Name', value: 'Quantity' },
		]),
	);
	commands.push(printRight('----------------------------------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	// Product List
	commands.push(
		...generateItemBlockCommands(
			requisitionSlip.products.map(({ product, quantity }) => ({
				label: product.name,
				value: formatQuantity(quantity, product),
			})),
		),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Footer - Print Details
	commands.push(
		printCenter(`Print Details: ${formatDateTime(dayjs(), false)}`),
	);
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
