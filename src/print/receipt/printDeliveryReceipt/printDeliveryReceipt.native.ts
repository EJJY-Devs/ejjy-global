import dayjs from 'dayjs';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EscPosCommands } from '../../utils/escpos.enum';
import {
	generateItemBlockCommands,
	generateReceiptHeaderCommands,
	printCenter,
	printRight,
} from '../../helper-escpos';
import { appendHtmlElement } from '../../helper-receipt';
import { PrintDeliveryReceipt } from './types';

export const printDeliveryReceiptNative = ({
	deliveryReceipt,
	user,
	isPdf,
}: PrintDeliveryReceipt): string[] | string => {
	const commands = [
		...generateDeliveryReceiptContentCommands(deliveryReceipt, user),
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

const generateDeliveryReceiptContentCommands = (
	deliveryReceipt: PrintDeliveryReceipt['deliveryReceipt'],
	user: PrintDeliveryReceipt['user'],
): string[] => {
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchHeader: deliveryReceipt.branch,
			title: 'DELIVERY RECEIPT',
		}),
		EscPosCommands.LINE_BREAK,
	);

	// Datetime created
	if (deliveryReceipt.datetime_created) {
		commands.push(printCenter('Date & Time Generated'));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			printCenter(formatDateTime(deliveryReceipt.datetime_created)),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(EscPosCommands.LINE_BREAK);

	// Customer Name
	if (deliveryReceipt.customer_name) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Customer:',
					value: deliveryReceipt.customer_name,
				},
			]),
		);
	}

	// Encoder
	if (deliveryReceipt.encoded_by) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Encoder:',
					value: getFullName(deliveryReceipt.encoded_by) || '',
				},
			]),
		);
	}

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
			deliveryReceipt.products.map(({ product, quantity_returned }) => ({
				label: product.name,
				value: formatQuantity(Number(quantity_returned), product),
			})),
		),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Remarks
	if (deliveryReceipt.overall_remarks) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Remarks:',
					value: deliveryReceipt.overall_remarks,
				},
			]),
		);
	}

	// Footer
	if (user) {
		commands.push(
			printCenter(
				`Print Details: ${formatDateTime(dayjs(), false)} ${user.employee_id}`,
			),
			EscPosCommands.LINE_BREAK,
		);
	}

	return commands;
};
