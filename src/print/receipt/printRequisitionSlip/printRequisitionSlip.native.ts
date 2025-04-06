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

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			siteSettings,
			title: 'REQUISITION SLIP',
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Requisition details
	commands.push(printCenter('REQUISITION SLIP'));
	commands.push(EscPosCommands.LINE_BREAK);

	// Date & Time Requested
	if (requisitionSlip.datetime_created) {
		commands.push(printCenter('Date & Time Requested'));
		commands.push(
			printCenter(formatDateTime(requisitionSlip.datetime_created)),
		);
	}

	// Requestor Name
	if (requisitionSlip.approved_by) {
		commands.push(printCenter('Requestor:'));
		commands.push(printCenter(getFullName(requisitionSlip.approved_by)));
	}

	// Branch Name
	if (requisitionSlip.branch) {
		commands.push(printCenter('Requesting Branch:'));
		commands.push(printCenter(requisitionSlip.branch.name));
	}

	// Requisition Slip Reference Number
	if (requisitionSlip.reference_number) {
		commands.push(printCenter('Requisition Slip ID:'));
		commands.push(printCenter(requisitionSlip.reference_number));
	}

	commands.push(EscPosCommands.LINE_BREAK);

	// Item List (Products)
	commands.push(printCenter('Product List'));
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
		commands.push(printRight(`Printed by: ${getFullName(user)}`));
	}

	commands.push(...generateReceiptFooterCommands(siteSettings));

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(
		printCenter('This Document Is Not Valid For Claim Of Input Tax'),
	);
	commands.push(printCenter('Thank You!'));

	return commands;
};
