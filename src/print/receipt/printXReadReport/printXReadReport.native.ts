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
import { EMPTY_CELL, PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintXReadReport } from './types';

export const printXReadReportNative = ({
	report,
	siteSettings,
	user,
}: PrintXReadReport): string[] => {
	const commands: string[] = [];

	commands.push(
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
	);

	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine: report.branch_machine,
			title: 'X-READING REPORT',
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);

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

	const session = report.cashiering_session;
	if (session) {
		commands.push(printCenter('Session Datetime'));
		commands.push(EscPosCommands.LINE_BREAK);
		const sessionTime = [
			formatTime(session.datetime_started),
			session.datetime_ended ? formatTime(session.datetime_ended) : null,
		]
			.filter(Boolean)
			.join(' - ');
		commands.push(printCenter(`${formatDate(session.date)} | ${sessionTime}`));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			printCenter(
				`Cashier: ${session.user.employee_id} | ${getFullName(session.user)}`,
			),
		);
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Beg Invoice #:',
				value: report.beginning_or?.or_number || EMPTY_CELL,
			},
			{
				label: 'End Invoice #:',
				value: report.ending_or?.or_number || EMPTY_CELL,
			},
			{
				label: 'Transaction Count:',
				value: `${report.total_transactions}`,
			},
			{
				label: 'Opening Fund:',
				value: formatInPeso(report.opening_fund, PESO_SIGN),
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
				value: formatInPeso(report.gross_sales_of_the_day, PESO_SIGN),
			},
		]),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Cash SI',
				value: formatInPeso(report.sales_invoice_payments, PESO_SIGN),
			},
			{
				label: 'Charge SI',
				value: formatInPeso(report.charge_invoice_payments, PESO_SIGN),
			},
		]),
	);

	commands.push(printCenter('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(printCenter('Gross Sales Breakdown'));
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
				label: 'VAT Amount',
				value: formatInPeso(report.vat_amount, PESO_SIGN),
			},
			{
				label: 'Zero Rated Sales',
				value: formatInPeso(0, PESO_SIGN),
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
				value: formatInPeso(report.cash_payment, PESO_SIGN),
			},
			{
				label: '+Check',
				value: formatInPeso(report.check_payment, PESO_SIGN),
			},
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

	commands.push(printCenter('Cash on Hand'));
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(
		...generateItemBlockCommands([
			{
				label: '+Payment Received',
				value: formatInPeso(report.total_payment_received, PESO_SIGN),
			},
			{
				label: '+Opening Fund',
				value: formatInPeso(report.opening_fund, PESO_SIGN),
			},
			{
				label: '+Cash In',
				value: formatInPeso(report.cash_in, PESO_SIGN),
			},
			{
				label: '-Cash Out',
				value: formatInPeso(report.cash_out, PESO_SIGN),
			},
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

	commands.push(printCenter('Transaction Summary'));
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

	if (user) {
		commands.push(printCenter(`Printed by: ${getFullName(user)}`));
	}

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(...generateReceiptFooterCommands(siteSettings));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(
		printCenter('This Document Is Not Valid For Claim Of Input Tax'),
	);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Thank You!'));

	commands.push(
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
	);

	return commands;
};
