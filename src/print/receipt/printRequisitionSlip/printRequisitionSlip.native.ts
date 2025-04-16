import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintRequisitionSlip } from './types';
import {
	generateItemBlockCommands,
	generateReceiptFooterCommands,
	generateReceiptHeaderCommands,
	printCenter,
	printRight,
} from '../../helper-escpos';

export const printRequisitionSlipNative = ({
	requisitionSlip,
	siteSettings,
	user,
}: PrintRequisitionSlip): string[] => {
	const commands: string[] = [];

	commands.push(' ');
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(' ');
	commands.push(EscPosCommands.LINE_BREAK);

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			title: 'REQUISITION SLIP',
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Date & Time Requested
	if (requisitionSlip.datetime_created) {
		commands.push(printCenter('Date & Time Requested'));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			printCenter(formatDateTime(requisitionSlip.datetime_created)),
		);
	}

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	// Requestor Name
	if (requisitionSlip.approved_by) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Requestor',
					value: getFullName(requisitionSlip.approved_by) || '',
				},
			]),
		);
	}

	// Branch Name
	if (requisitionSlip.branch) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Requesting Branch:',
					value: requisitionSlip.branch.name || '',
				},
			]),
		);
	}

	// Requisition Slip Reference Number
	if (requisitionSlip.reference_number) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Requisition Slip ID:',
					value: requisitionSlip.reference_number || '',
				},
			]),
		);
	}
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Product Name',
				value: 'Quantity',
			},
		]),
	);

	commands.push(printRight('---------------------------------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	// Item List (Products)
	commands.push(
		...generateItemBlockCommands(
			requisitionSlip.products.map(({ product, quantity }) => ({
				label: product.name,
				value: formatQuantity(quantity, product),
			})),
		),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Footer
	if (user) {
		commands.push(printCenter(`Printed by: ${getFullName(user)}`));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(...generateReceiptFooterCommands(siteSettings));

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(
		printCenter('This Document Is Not Valid For Claim Of Input Tax'),
	);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Thank You!'));

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(' ');
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(' ');
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
