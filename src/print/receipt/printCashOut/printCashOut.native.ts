import dayjs from 'dayjs';
import { formatDateTime, formatInPeso, getFullName } from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import {
	generateReceiptHeaderCommands,
	generateItemBlockCommands,
	generateReceiptFooterCommands,
} from '../../helper-escpos';
import { PrintCashOut } from './types';
import { EscPosCommands } from '../../utils/escpos.enum';

export const printCashOutNative = ({
	cashOut,
	siteSettings,
}: PrintCashOut): string[] => [
	...generateCashOutContentCommands(cashOut, siteSettings),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateCashOutContentCommands = (
	cashOut: PrintCashOut['cashOut'],
	siteSettings: PrintCashOut['siteSettings'],
): string[] => {
	const metadata = cashOut.cash_out_metadata;

	const {
		payee,
		particulars,
		received_by: receivedBy,
		prepared_by_user: preparedByUser,
	} = metadata;
	const datetime = formatDateTime(cashOut.datetime_created);
	const amount = formatInPeso(metadata.amount, PESO_SIGN);
	const preparedBy = getFullName(metadata.prepared_by_user);
	const approvedBy = getFullName(metadata.approved_by_user);

	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine: cashOut.branch_machine,
			title: 'DISBURSEMENT VOUCHER',
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Cash Out Details
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Payee:',
				value: payee || '',
			},
			{
				label: 'Particulars:',
				value: particulars || '',
			},
			{
				label: 'Amount:',
				value: amount,
			},
			{
				label: 'Received by:',
				value: receivedBy || '',
			},
			{
				label: 'Prepared by:',
				value: preparedBy,
			},
			{
				label: 'Approved by:',
				value: approvedBy,
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
				value: preparedByUser.employee_id,
			},
		]),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(...generateReceiptFooterCommands(siteSettings));

	return commands;
};
