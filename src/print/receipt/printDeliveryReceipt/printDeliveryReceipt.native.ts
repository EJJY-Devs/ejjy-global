import dayjs from 'dayjs';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EscPosCommands } from '../../utils/escpos.enum';
import {
	generateItemBlockCommands,
	generateReceiptHeaderCommandsV2,
	printCenter,
	printRight,
} from '../../helper-escpos';
import { appendHtmlElement, EMPTY_CELL } from '../../helper-receipt';
import { PrintDeliveryReceipt } from './types';

export const printDeliveryReceiptNative = ({
	deliveryReceipt,
	isPdf,
}: PrintDeliveryReceipt): string[] | string => {
	const commands = [
		...generateDeliveryReceiptContentCommands(deliveryReceipt),
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
): string[] => {
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommandsV2({
			branchHeader: deliveryReceipt.branch,
			title: 'DELIVERY RECEIPT',
		}),
		EscPosCommands.LINE_BREAK,
	);

	// Datetime Generated
	if (deliveryReceipt.datetime_created) {
		commands.push(printCenter('Datetime Generated:'));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			printCenter(formatDateTime(deliveryReceipt.datetime_created)),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(EscPosCommands.LINE_BREAK);

	// Receipt Info
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Reference #:',
				value: deliveryReceipt.reference_number || EMPTY_CELL,
			},
			{
				label: 'Vendor:',
				value: deliveryReceipt.branch?.name || EMPTY_CELL,
			},
			{
				label: 'Customer:',
				value: deliveryReceipt.customer_name || EMPTY_CELL,
			},
			{
				label: 'Encoder:',
				value: getFullName(deliveryReceipt.encoded_by) || EMPTY_CELL,
			},
		]),
	);
	commands.push(EscPosCommands.LINE_BREAK);

	// Table Header (still done with generateItemBlockCommands)
	commands.push(
		...generateItemBlockCommands([
			{ label: 'Product Name', value: 'Quantity' },
		]),
	);
	commands.push(printRight('----------------------------------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	// Product list
	commands.push(
		...generateItemBlockCommands(
			deliveryReceipt.products.map((item) => ({
				label: item.product.name,
				value: formatQuantity(Number(item.quantity_returned), item.product),
			})),
		),
	);
	commands.push(EscPosCommands.LINE_BREAK);

	// Print details
	commands.push(
		printCenter(`Print Details: ${formatDateTime(dayjs(), false)}`),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		printCenter(`Remarks ${deliveryReceipt.overall_remarks || ''}`),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
