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
import { PrintReceivingReport } from './types';

export const printReceivingReportNative = ({
	receivingReport,
	user,
	isPdf,
}: PrintReceivingReport): string[] | string => {
	const commands = [
		...generateReceivingReportContentCommands(receivingReport, user),
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
	user: PrintReceivingReport['user'],
): string[] => {
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchHeader: receivingReport.branch,
			title: 'RECEIVING REPORT',
		}),
		EscPosCommands.LINE_BREAK,
	);

	// Datetime created
	if (receivingReport.datetime_created) {
		commands.push(printCenter('Date & Time Generated'));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			printCenter(formatDateTime(receivingReport.datetime_created)),
		);
		commands.push(EscPosCommands.LINE_BREAK);
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
			receivingReport.products.map(({ product, quantity }) => ({
				label: product.name,
				value: formatQuantity(quantity, product),
			})),
		),
	);

	commands.push(EscPosCommands.LINE_BREAK);

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

	// Encoder
	if (receivingReport.encoded_by) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Encoder:',
					value: getFullName(receivingReport.encoded_by),
				},
			]),
		);
	}

	// Inspector
	if (receivingReport.checked_by) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Inspector:',
					value: getFullName(receivingReport.checked_by),
				},
			]),
		);
	}

	commands.push(EscPosCommands.LINE_BREAK);

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
