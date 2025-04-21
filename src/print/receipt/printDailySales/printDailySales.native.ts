import {
	formatDate,
	formatInPeso,
	formatTime,
	getFullName,
} from '../../../utils';
import {
	generateItemBlockCommands,
	generateReceiptFooterCommands,
	generateReceiptHeaderCommands,
	printCenter,
} from '../../helper-escpos';
import { PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintDailySales } from './types';

export const printDailySalesNative = ({
	dailySales,
	siteSettings,
	user,
}: PrintDailySales): string[] => [
	...generateDailySalesReportContentCommands(dailySales, siteSettings, user),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateDailySalesReportContentCommands = (
	dailySales: PrintDailySales['dailySales'],
	siteSettings: PrintDailySales['siteSettings'],
	user: PrintDailySales['user'],
): string[] => {
	const commands: string[] = [];

	commands.push(' ');
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(' ');
	commands.push(EscPosCommands.LINE_BREAK);

	const openDatetime = dailySales.daily_sales_data.branch_day_open_datetime;
	const generationDatetime = dailySales.generation_datetime;
	const openTime = openDatetime ? formatTime(openDatetime) : '';
	const closeTime = generationDatetime ? formatTime(generationDatetime) : '';

	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine: dailySales.branch_machine,
			title: 'DAILY SALES REPORT',
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	if (generationDatetime) {
		commands.push(printCenter('Report Generation Datetime'));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			printCenter(
				`${formatDate(generationDatetime)} - ${formatTime(generationDatetime)}`,
			),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(printCenter('Day Datetime'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(
		printCenter(
			`${formatDate(openDatetime || '')} | ${[openTime, closeTime].filter(Boolean).join(' - ')}`,
		),
	);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Beg Sales Invoice #:',
				value: dailySales.beginning_or?.or_number || '',
			},
			{
				label: 'End Sales Invoice #:',
				value: dailySales.ending_or?.or_number || '',
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Current Accum. Sales (end)',
				value: formatInPeso(dailySales.ending_sales, PESO_SIGN),
			},
			{
				label: '-Previous Accum. Sales (beg)',
				value: formatInPeso(dailySales.beginning_sales, PESO_SIGN),
			},
			{
				label: '=Gross Sales of the Day',
				value: formatInPeso(dailySales.gross_sales, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Sales Breakdown'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: 'VAT Exempt Sales',
				value: formatInPeso(dailySales.vat_exempt, PESO_SIGN),
			},
			{
				label: 'VATable Sales',
				value: formatInPeso(dailySales.vat_sales, PESO_SIGN),
			},
			{
				label: 'VAT Amount (12%)',
				value: formatInPeso(dailySales.vat_amount, PESO_SIGN),
			},
			{ label: 'Zero Rated Sales', value: formatInPeso(0, PESO_SIGN) },
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Deductions'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Disc. SC',
				value: formatInPeso(dailySales.sc_discount, PESO_SIGN),
			},
			{
				label: '+Disc. PWD',
				value: formatInPeso(dailySales.pwd_discount, PESO_SIGN),
			},
			{
				label: '+Disc. NAAC',
				value: formatInPeso(dailySales.naac_discount, PESO_SIGN),
			},
			{
				label: '+Disc. Solo Parent',
				value: formatInPeso(dailySales.sp_discount, PESO_SIGN),
			},
			{
				label: '+Disc. Others',
				value: formatInPeso(dailySales.others_discount, PESO_SIGN),
			},
			{ label: '+Return', value: formatInPeso(0, PESO_SIGN) },
			{ label: '+Void', value: formatInPeso(dailySales.void, PESO_SIGN) },
			{
				label: '=Total',
				value: formatInPeso(dailySales.total_deductions, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('VAT Adjustment'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Disc. SC',
				value: formatInPeso(dailySales.vat_sc_discount, PESO_SIGN),
			},
			{
				label: '+Disc. PWD',
				value: formatInPeso(dailySales.vat_pwd_discount, PESO_SIGN),
			},
			{
				label: '+Disc. Others',
				value: formatInPeso(dailySales.vat_others_discount, PESO_SIGN),
			},
			{ label: '+VAT on Returns', value: formatInPeso(0, PESO_SIGN) },
			{
				label: '+Others',
				value: formatInPeso(dailySales.vat_others, PESO_SIGN),
			},
			{
				label: '=Total',
				value: formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('VAT Payable'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+VAT Amount (12%)',
				value: formatInPeso(dailySales.vat_amount, PESO_SIGN),
			},
			{
				label: '-VAT Adjustment',
				value: formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN),
			},
			{
				label: '=Total',
				value: formatInPeso(dailySales.vat_payable, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Gross Sales of the Day',
				value: formatInPeso(dailySales.gross_sales, PESO_SIGN),
			},
			{
				label: '-Deductions',
				value: formatInPeso(dailySales.total_deductions, PESO_SIGN),
			},
			{
				label: '-VAT Amount',
				value: formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN),
			},
			{
				label: '=Net Amount',
				value: formatInPeso(dailySales.net_sales, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Payment Received'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Cash',
				value: formatInPeso(dailySales.cash_payment, PESO_SIGN),
			},
			{
				label: '+Check',
				value: formatInPeso(dailySales.check_payment, PESO_SIGN),
			},
			{
				label: '+Credit Card',
				value: formatInPeso(dailySales.credit_card_payment, PESO_SIGN),
			},
			{
				label: '=Total',
				value: formatInPeso(dailySales.total_payment_received, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Cash on Hand'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Payment Received',
				value: formatInPeso(dailySales.total_payment_received, PESO_SIGN),
			},
			{
				label: '+Opening fund',
				value: formatInPeso(dailySales.opening_fund, PESO_SIGN),
			},
			{ label: '+Cash In', value: formatInPeso(dailySales.cash_in, PESO_SIGN) },
			{
				label: '-Cash Out',
				value: formatInPeso(dailySales.cash_out, PESO_SIGN),
			},
			{
				label: '-Cash Collection',
				value: formatInPeso(dailySales.cash_collection, PESO_SIGN),
			},
			{
				label: '=Total',
				value: formatInPeso(dailySales.total_cash_on_hand, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Transaction Summary'));
	commands.push(EscPosCommands.LINE_BREAK);

	const shortOverVal =
		(dailySales.short_over < 0 ? '(' : '') +
		formatInPeso(Math.abs(dailySales.short_over), PESO_SIGN) +
		(dailySales.short_over < 0 ? ')' : '');

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Cash in Drawer',
				value: formatInPeso(dailySales.cash_in_drawer, PESO_SIGN),
			},
			{
				label: '-Cash on Hand',
				value: formatInPeso(dailySales.total_cash_on_hand, PESO_SIGN),
			},
			{ label: '=(Short)/Over', value: shortOverVal },
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	if (user) {
		commands.push(printCenter(`Printed by: ${getFullName(user)}`));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(...generateReceiptFooterCommands(siteSettings));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(
		printCenter('This Document Is Not Valid For Claim Of Input Tax'),
	);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Thank You!'));
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
