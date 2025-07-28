import dayjs from 'dayjs';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EscPosCommands } from '../../utils/escpos.enum';
import {
	generateItemBlockCommands,
	generateReceiptHeaderCommandsV2,
	printCenter,
	printRight,
} from '../../helper-escpos';
import { appendHtmlElement } from '../../helper-receipt';
import { PrintReceivingReport } from './types';

export const printReceivingReportNative = ({
	receivingReport,
	isPdf,
}: PrintReceivingReport): string[] | string => {
	const commands = [
		...generateReceivingReportContentCommands(receivingReport),
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

const generateReceivingReportContentCommands = (
	receivingReport: PrintReceivingReport['receivingReport'],
): string[] => {
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommandsV2({
			branchHeader: receivingReport.branch,
			title: 'RECEIVING REPORT',
		}),
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
	);

	// Datetime created
	if (receivingReport.datetime_created) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Datetime Generated:',
					value: formatDateTime(receivingReport.datetime_created),
				},
			]),
		);
	}

	// Reference Number
	if (receivingReport.reference_number) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Reference #:',
					value: receivingReport.reference_number,
				},
			]),
		);
	}

	// Vendor
	if (receivingReport.supplier_name) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Vendor:',
					value: receivingReport.supplier_name,
				},
			]),
		);
	}

	// Customer
	if (receivingReport.branch?.name) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Customer:',
					value: receivingReport.branch?.name,
				},
			]),
		);
	}

	// Encoder
	if (receivingReport.encoded_by) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Encoder:',
					value: getFullName(receivingReport.encoded_by),
				},
			]),
			EscPosCommands.LINE_BREAK,
		);
	}

	// Table Header (still done with generateItemBlockCommands)
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
			receivingReport.receiving_voucher_products.map(
				({ product, quantity }) => ({
					label: product.name,
					value: formatQuantity(quantity, product),
				}),
			),
		),
	);
	commands.push(EscPosCommands.LINE_BREAK);

	// Print details (footer)
	commands.push(
		printCenter(`Print Details: ${formatDateTime(dayjs(), false)}`),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		printCenter(`Remarks ${receivingReport?.overall_remarks || ''}`),
	);

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
