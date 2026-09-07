import dayjs from 'dayjs';
import { formatDateTime, formatInPeso } from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import {
	generateReceiptHeaderCommands,
	generateItemBlockCommands,
	generateReceiptFooterCommands,
} from '../../helper-escpos';
import { CashCollectionMetadata } from '../../../types';
import { CASH_COLLECTION_VOUCHER_TITLE } from './constants';
import { PrintCashCollection } from './types';
import { EscPosCommands } from '../../utils/escpos.enum';

export const printCashCollectionNative = ({
	cashBreakdown,
	siteSettings,
	user,
}: PrintCashCollection): string[] => [
	...generateCashCollectionContentCommands(cashBreakdown, siteSettings, user),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

export const generateCashCollectionContentCommands = (
	cashBreakdown: PrintCashCollection['cashBreakdown'],
	siteSettings: PrintCashCollection['siteSettings'],
	user: PrintCashCollection['user'],
): string[] => {
	const metadata =
		cashBreakdown.cash_collection_metadata as CashCollectionMetadata;

	const { collector } = metadata;
	const datetime = formatDateTime(cashBreakdown.datetime_created);
	const amount = formatInPeso(metadata.amount, PESO_SIGN);

	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine: cashBreakdown.branch_machine,
			title: CASH_COLLECTION_VOUCHER_TITLE,
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Cash Collection Details
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Collector:',
				value: collector || '',
			},
			{
				label: 'Amount:',
				value: amount,
			},
			{
				label: 'Remarks:',
				value: cashBreakdown.remarks || '',
			},
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
