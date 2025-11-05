import {
	formatInPeso,
	formatDateTime,
	getCashBreakdownTypeDescription,
} from '../../../utils';
import { cashBreakdownCategories } from '../../../globals';
import {
	generateItemBlockCommands,
	generateReceiptFooterCommands,
	generateReceiptHeaderCommands,
	printCenter,
	generateThreeColumnLine,
} from '../../helper-escpos';
import { PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
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

	// COINS section
	commands.push('COINS');
	commands.push(EscPosCommands.LINE_BREAK);

	const breakdownCoins = [
		{
			label: 'P 0.25',
			quantity: cashBreakdown.coins_25,
			amount: 0.25 * cashBreakdown.coins_25,
		},
		{
			label: 'P 1.00',
			quantity: cashBreakdown.coins_1,
			amount: 1 * cashBreakdown.coins_1,
		},
		{
			label: 'P 5.00',
			quantity: cashBreakdown.coins_5,
			amount: 5 * cashBreakdown.coins_5,
		},
		{
			label: 'P 10.00',
			quantity: cashBreakdown.coins_10,
			amount: 10 * cashBreakdown.coins_10,
		},
		{
			label: 'P 20.00',
			quantity: cashBreakdown.coins_20,
			amount: 20 * cashBreakdown.coins_20,
		},
	];

	breakdownCoins.forEach(({ label, quantity, amount }) => {
		if (quantity > 0) {
			commands.push(
				generateThreeColumnLine(
					label,
					quantity.toString(),
					formatInPeso(amount, ''),
				),
			);
			commands.push(EscPosCommands.LINE_BREAK);
		}
	});

	commands.push(EscPosCommands.LINE_BREAK);

	// BILLS section
	commands.push('BILLS');
	commands.push(EscPosCommands.LINE_BREAK);

	const breakdownBills = [
		{
			label: 'P 20.00',
			quantity: cashBreakdown.bills_20,
			amount: 20 * cashBreakdown.bills_20,
		},
		{
			label: 'P 50.00',
			quantity: cashBreakdown.bills_50,
			amount: 50 * cashBreakdown.bills_50,
		},
		{
			label: 'P 100.00',
			quantity: cashBreakdown.bills_100,
			amount: 100 * cashBreakdown.bills_100,
		},
		{
			label: 'P 200.00',
			quantity: cashBreakdown.bills_200,
			amount: 200 * cashBreakdown.bills_200,
		},
		{
			label: 'P 500.00',
			quantity: cashBreakdown.bills_500,
			amount: 500 * cashBreakdown.bills_500,
		},
		{
			label: 'P 1,000.00',
			quantity: cashBreakdown.bills_1000,
			amount: 1000 * cashBreakdown.bills_1000,
		},
	];

	breakdownBills.forEach(({ label, quantity, amount }) => {
		if (quantity > 0) {
			commands.push(
				generateThreeColumnLine(
					label,
					quantity.toString(),
					formatInPeso(amount, ''),
				),
			);
			commands.push(EscPosCommands.LINE_BREAK);
		}
	});

	commands.push(EscPosCommands.LINE_BREAK);

	// Total
	commands.push(printCenter('----------------------------------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'TOTAL',
				value: formatInPeso(cashBreakdown.total_amount, PESO_SIGN),
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
