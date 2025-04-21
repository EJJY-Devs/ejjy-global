import {
	formatDate,
	formatInPeso,
	formatTime,
	getFullName,
} from '../../../utils';
import { PESO_SIGN, EMPTY_CELL } from '../../helper-receipt';
import { printCenter } from '../../helper-escpos';
import { EscPosCommands } from '../../utils/escpos.enum';
import {
	generateItemBlockCommands,
	generateReceiptFooterCommands,
	generateReceiptHeaderCommands,
} from '../../helper-escpos';
import { PrintZReadReport } from './types';

export const printZReadReportNative = ({
	report,
	siteSettings,
	user,
}: PrintZReadReport) => [
	...generateZReadContentCommands(report, siteSettings, user),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateZReadContentCommands = (
	report: PrintZReadReport['report'],
	siteSettings: PrintZReadReport['siteSettings'],
	user: PrintZReadReport['user'],
): string[] => {
	const commands: string[] = [];

	commands.push(' ');
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(' ');
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine: report.branch_machine,
			title: 'Z-READING REPORT',
		}),
		EscPosCommands.LINE_BREAK,
	);

	if (report.generation_datetime) {
		commands.push(printCenter('Report Generation Datetime'));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			printCenter(
				`${formatDate(report.generation_datetime)} - ${formatTime(report.generation_datetime)}`,
			),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(printCenter('Day Datetime'));
	commands.push(EscPosCommands.LINE_BREAK);

	const openTime = report.branch_day_open_datetime
		? formatTime(report.branch_day_open_datetime)
		: null;
	const closeTime = report.generation_datetime
		? formatTime(report.generation_datetime)
		: null;
	const openDate = report.branch_day_open_datetime
		? formatDate(report.branch_day_open_datetime)
		: EMPTY_CELL;
	const timeRange = [openTime, closeTime].filter(Boolean).join(' - ');
	commands.push(printCenter(`${openDate} | ${timeRange}`));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Beg Sales Invoice #:',
				value: report.beginning_or?.or_number || EMPTY_CELL,
			},
			{
				label: 'End Sales Invoice #:',
				value: report.ending_or?.or_number || EMPTY_CELL,
			},
			{
				label: 'Beg Void #:',
				value: report.ending_void_or?.or_number || EMPTY_CELL,
			},
			{
				label: 'End Void #:',
				value: report.ending_void_or?.or_number || EMPTY_CELL,
			},
			{ label: 'Beg Return #:', value: EMPTY_CELL },
			{ label: 'End Return #:', value: EMPTY_CELL },
		]),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{ label: 'Reset Counter No.:', value: report.reset_counter },
			{
				label: 'Z Counter No.:',
				value: report.gross_sales === 0 ? EMPTY_CELL : report.z_counter,
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Current Accum. Sales (end)',
				value: formatInPeso(report.ending_sales, PESO_SIGN),
			},
			{
				label: '-Previous Accum. Sales (beg)',
				value: formatInPeso(report.beginning_sales, PESO_SIGN),
			},
			{
				label: '=Gross Sales of the Day',
				value: formatInPeso(report.current_day_gross_sales, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Gross Sales of the Day',
				value: formatInPeso(report.current_day_gross_sales, PESO_SIGN),
			},
			{
				label: '-Deductions',
				value: formatInPeso(report.current_day_deductions, PESO_SIGN),
			},
			{
				label: '-VAT Amount',
				value: formatInPeso(report.current_day_vat_deductions, PESO_SIGN),
			},
			{
				label: '=Net Amount',
				value: formatInPeso(report.current_day_net_sales, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Current Day Payment Received'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{ label: '+Cash', value: formatInPeso(report.cash_payment, PESO_SIGN) },
			{ label: '+Check', value: formatInPeso(report.check_payment, PESO_SIGN) },
			{
				label: '+Credit Card',
				value: formatInPeso(report.credit_card_payment, PESO_SIGN),
			},
			{
				label: '=Total',
				value: formatInPeso(report.total_payment_received, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Current Day Cash on Hand'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Payment Received',
				value: formatInPeso(report.total_payment_received, PESO_SIGN),
			},
			{
				label: '+Opening fund',
				value: formatInPeso(report.opening_fund, PESO_SIGN),
			},
			{ label: '+Cash In', value: formatInPeso(report.cash_in, PESO_SIGN) },
			{ label: '-Cash Out', value: formatInPeso(report.cash_out, PESO_SIGN) },
			{
				label: '-Cash Collection',
				value: formatInPeso(report.cash_collection, PESO_SIGN),
			},
			{
				label: '=Total',
				value: formatInPeso(report.total_cash_on_hand, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Current Day Transaction Summary'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Cash in Drawer',
				value: formatInPeso(report.cash_in_drawer, PESO_SIGN),
			},
			{
				label: '-Cash on Hand',
				value: formatInPeso(report.total_cash_on_hand, PESO_SIGN),
			},
			{
				label: '=(Short)/Over',
				value:
					(report.short_over < 0 ? '(' : '') +
					formatInPeso(Math.abs(report.short_over), PESO_SIGN) +
					(report.short_over < 0 ? ')' : ''),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Accumulated Sales Breakdown'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: 'VAT Exempt Sales',
				value: formatInPeso(report.vat_exempt, PESO_SIGN),
			},
			{
				label: 'VATable Sales',
				value: formatInPeso(report.vat_sales, PESO_SIGN),
			},
			{
				label: 'VAT Amount (12%)',
				value: formatInPeso(report.vat_amount, PESO_SIGN),
			},
			{ label: 'Zero Rated Sales', value: formatInPeso(0, PESO_SIGN) },
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Accumulated Deductions'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Disc. SC',
				value: formatInPeso(report.sc_discount, PESO_SIGN),
			},
			{
				label: '+Disc. PWD',
				value: formatInPeso(report.pwd_discount, PESO_SIGN),
			},
			{
				label: '+Disc. NAAC',
				value: formatInPeso(report.naac_discount, PESO_SIGN),
			},
			{
				label: '+Disc. Solo Parent',
				value: formatInPeso(report.sp_discount, PESO_SIGN),
			},
			{
				label: '+Disc. Others',
				value: formatInPeso(report.others_discount, PESO_SIGN),
			},
			{ label: '+Return', value: formatInPeso(0, PESO_SIGN) },
			{ label: '+Void', value: formatInPeso(report.void, PESO_SIGN) },
			{
				label: '=Total',
				value: formatInPeso(report.total_deductions, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Accumulated VAT Adjustment'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Disc. SC',
				value: formatInPeso(report.vat_sc_discount, PESO_SIGN),
			},
			{
				label: '+Disc. PWD',
				value: formatInPeso(report.vat_pwd_discount, PESO_SIGN),
			},
			{
				label: '+Disc. Others',
				value: formatInPeso(report.vat_others_discount, PESO_SIGN),
			},
			{ label: '+VAT on Returns', value: formatInPeso(0, PESO_SIGN) },
			{ label: '+Others', value: formatInPeso(report.vat_others, PESO_SIGN) },
			{
				label: '=Total',
				value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Accumulated VAT Payable'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+VAT Amount (12%)',
				value: formatInPeso(report.vat_amount, PESO_SIGN),
			},
			{
				label: '-VAT Adjustment',
				value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
			},
			{ label: '=Total', value: formatInPeso(report.vat_payable, PESO_SIGN) },
		]),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	if (user) {
		commands.push(printCenter(`Printed by: ${getFullName(user)}`));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(...generateReceiptFooterCommands(siteSettings));
	commands.push(
		printCenter('This Document Is Not Valid For Claim Of Input Tax'),
	);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Thank You!'));
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
