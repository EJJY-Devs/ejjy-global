import dayjs from 'dayjs';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintRequisitionSlip } from './types';
import {
	generateItemBlockCommands,
	generateReceiptHeaderCommands,
	printCenter,
	printRight,
} from '../../helper-escpos';
import { appendHtmlElement } from '../../helper-receipt';

export const printRequisitionSlipNative = ({
	requisitionSlip,
	siteSettings,
	user,
	isPdf,
}: PrintRequisitionSlip): string[] | string => {
	const commands = [
		...generateRequisitionSlipContentCommands(
			requisitionSlip,
			siteSettings,
			user,
		),
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
	siteSettings: PrintRequisitionSlip['siteSettings'],
	user: PrintRequisitionSlip['user'],
): string[] => {
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchHeader: requisitionSlip.branch,
			title: 'REQUISITION SLIP',
		}),
		EscPosCommands.LINE_BREAK,
	);

	// Date & Time Requested
	if (requisitionSlip.datetime_created) {
		commands.push(printCenter('Date & Time Requested'));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			printCenter(formatDateTime(requisitionSlip.datetime_created)),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(EscPosCommands.LINE_BREAK);

	// Requestor Name
	if (requisitionSlip.approved_by) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Requestor:',
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

	// Table Header
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Product Name',
				value: 'Quantity',
			},
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

	// Footer
	if (user) {
		commands.push(
			printCenter(
				`Print Details: ${formatDateTime(dayjs(), false)} ${user.employee_id}`,
			),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	return commands;
};
