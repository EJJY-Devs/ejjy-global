import dayjs from 'dayjs';
import { formatDateTime, formatInPeso } from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import {
	generateReceiptHeaderCommands,
	generateItemBlockCommands,
	generateReceiptFooterCommands,
} from '../../helper-escpos';
import { CashInMetadata } from '../../../types';
import { CASH_IN_VOUCHER_TITLE } from './constants';
import { PrintCashIn } from './types';
import { EscPosCommands } from '../../utils/escpos.enum';

const REMARKS_LABEL = 'Remarks:';
// 40-char paper width minus label and minimum spacing
const REMARKS_LINE_WIDTH = 40 - REMARKS_LABEL.length - 3;

const wrapText = (text: string, width: number): string[] => {
	const lines: string[] = [];
	let current = '';

	text.split(/\s+/).forEach((word) => {
		let remaining = word;
		while (remaining.length > width) {
			if (current) {
				lines.push(current);
				current = '';
			}
			lines.push(remaining.slice(0, width));
			remaining = remaining.slice(width);
		}

		if (!remaining) return;

		if (!current) {
			current = remaining;
		} else if (current.length + 1 + remaining.length <= width) {
			current += ` ${remaining}`;
		} else {
			lines.push(current);
			current = remaining;
		}
	});

	if (current) lines.push(current);

	return lines;
};

const generateRemarksItems = (remarks?: string) => {
	const trimmed = remarks?.trim();
	if (!trimmed) return [];

	return wrapText(trimmed, REMARKS_LINE_WIDTH).map((value, index) => ({
		label: index === 0 ? REMARKS_LABEL : '',
		value,
	}));
};

export const printCashInNative = ({
	cashBreakdown,
	siteSettings,
	user,
}: PrintCashIn): string[] => [
	...generateCashInContentCommands(cashBreakdown, siteSettings, user),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

export const generateCashInContentCommands = (
	cashBreakdown: PrintCashIn['cashBreakdown'],
	siteSettings: PrintCashIn['siteSettings'],
	user: PrintCashIn['user'],
): string[] => {
	const metadata = cashBreakdown.cash_in_metadata as CashInMetadata;

	const { received_from: receivedFrom, particulars } = metadata;
	const datetime = formatDateTime(cashBreakdown.datetime_created);
	const amount = formatInPeso(metadata.amount, PESO_SIGN);

	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine: cashBreakdown.branch_machine,
			title: CASH_IN_VOUCHER_TITLE,
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Cash In Details
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Received From:',
				value: receivedFrom || '',
			},
			{
				label: 'Particulars:',
				value: particulars || '',
			},
			{
				label: 'Amount:',
				value: amount,
			},
			...generateRemarksItems(cashBreakdown.remarks),
		]),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Footer
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'GDT:',
				value: datetime,
			},
			{
				label: 'PDT:',
				value: formatDateTime(dayjs(), false),
			},
			{
				label: '',
				value: user?.employee_id || '',
			},
		]),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(...generateReceiptFooterCommands(siteSettings));

	return commands;
};
