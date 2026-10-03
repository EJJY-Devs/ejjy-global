import {
	CASH_BREAKDOWN_BILLS,
	CASH_BREAKDOWN_COINS,
	formatInPeso,
	formatDateTime,
	getCashBreakdownTotals,
	getCashBreakdownTypeDescription,
} from '../../../utils';
import { cashBreakdownCategories, cashBreakdownTypes } from '../../../globals';
import {
	generateItemBlockCommands,
	generateReceiptFooterCommands,
	generateReceiptHeaderCommands,
	printCenter,
	generateThreeColumnLine,
} from '../../helper-escpos';
import { PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
import { generateCashInContentCommands } from '../printCashIn/printCashIn.native';
import { generateCashCollectionContentCommands } from '../printCashCollection/printCashCollection.native';
import { PrintCashBreakdown } from './types';

export const printCashBreakdownNative = ({
	cashBreakdown,
	siteSettings,
	user,
}: PrintCashBreakdown): string[] => [
	...generateCashBreakdownContentCommands(cashBreakdown, siteSettings, user),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateCashBreakdownContentCommands = (
	cashBreakdown: PrintCashBreakdown['cashBreakdown'],
	siteSettings: PrintCashBreakdown['siteSettings'],
	user: PrintCashBreakdown['user'],
): string[] => {
	// Cash In and Cash Collection are voucher-style receipts, not
	// denomination (coins/bills) breakdowns — Opening Fund (start_session)
	// and Cash in Drawer (end_session) keep the denomination table below
	// untouched.
	if (
		cashBreakdown.category === cashBreakdownCategories.CASH_IN &&
		cashBreakdown.type === cashBreakdownTypes.MID_SESSION
	) {
		return generateCashInContentCommands(cashBreakdown, siteSettings, user);
	}

	if (
		cashBreakdown.category === cashBreakdownCategories.CASH_BREAKDOWN &&
		cashBreakdown.type === cashBreakdownTypes.MID_SESSION
	) {
		return generateCashCollectionContentCommands(
			cashBreakdown,
			siteSettings,
			user,
		);
	}

	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine: cashBreakdown.branch_machine,
			title: getCashBreakdownTypeDescription(
				cashBreakdown.category,
				cashBreakdown.type,
			),
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Table headers
	commands.push(generateThreeColumnLine('DENOM', 'QTY', 'AMOUNT'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('----------------------------------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	const { coinsTotal, billsTotal, total } =
		getCashBreakdownTotals(cashBreakdown);

	const pushDenominationSection = (
		title: string,
		denominations: typeof CASH_BREAKDOWN_COINS,
		subtotal: number,
	) => {
		commands.push(title);
		commands.push(EscPosCommands.LINE_BREAK);

		denominations.forEach(({ key, value }) => {
			const quantity = cashBreakdown[key];

			if (quantity > 0) {
				commands.push(
					generateThreeColumnLine(
						`${PESO_SIGN} ${formatInPeso(value, '')}`,
						quantity.toString(),
						formatInPeso(value * quantity, ''),
					),
				);
				commands.push(EscPosCommands.LINE_BREAK);
			}
		});

		commands.push(
			...generateItemBlockCommands([
				{
					label: `${title} SUBTOTAL`,
					value: formatInPeso(subtotal, PESO_SIGN),
				},
			]),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	};

	pushDenominationSection('COINS', CASH_BREAKDOWN_COINS, coinsTotal);
	commands.push(EscPosCommands.LINE_BREAK);
	pushDenominationSection('BILLS', CASH_BREAKDOWN_BILLS, billsTotal);
	commands.push(EscPosCommands.LINE_BREAK);

	// Total
	commands.push(printCenter('----------------------------------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'TOTAL',
				value: formatInPeso(total, PESO_SIGN),
			},
		]),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Date and time
	commands.push(`GDT: ${formatDateTime(cashBreakdown.datetime_created)}`);
	commands.push(EscPosCommands.LINE_BREAK);

	// Print details (user information)
	if (user) {
		const userName = `${user.first_name} ${user.last_name}`.trim();
		const userEmployee = user.employee_id ? ` (${user.employee_id})` : '';
		commands.push(`PU: ${userName}${userEmployee}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	// Remarks for specific categories
	if (
		(cashBreakdown.category === cashBreakdownCategories.CASH_IN ||
			cashBreakdown.category === cashBreakdownCategories.PRINT_ONLY) &&
		cashBreakdown.remarks
	) {
		commands.push(`Remarks: ${cashBreakdown.remarks}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(EscPosCommands.LINE_BREAK);

	// Footer
	commands.push(...generateReceiptFooterCommands(siteSettings));

	return commands;
};
