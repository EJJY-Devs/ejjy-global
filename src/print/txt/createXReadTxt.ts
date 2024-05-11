import { SiteSettings, User, XReadReport } from '../../types';
import {
	formatDate,
	formatInPeso,
	formatTime,
	getFullName,
	ReportTextFile,
} from '../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../helper-receipt';
import {
	getTxtFooter,
	getTxtHeader,
	getTxtItemBlock,
	getTxtPrintDetails,
	RowData,
	TXT_DIVIDER,
	TXT_LINE_BREAK,
	writeFile,
} from '../helper-txt';

export const createXReadTxt = (
	report: XReadReport,
	siteSettings: SiteSettings,
	user?: User,
	returnContent = false,
) => {
	const cashieringSession = report.cashiering_session;
	const reportTextFile = new ReportTextFile();

	const rowData: (RowData | string)[] = getTxtHeader({
		branchMachine: report.branch_machine,
		siteSettings,
	});

	rowData.push({ center: 'X-READING REPORT' });

	if (report.gross_sales === 0) {
		rowData.push(...[{ center: '(NO TRANSACTION)' }, TXT_LINE_BREAK]);
	}

	if (report.generation_datetime) {
		rowData.push(
			...[
				{ center: 'Report Generation Datetime' },
				{
					center: [
						formatDate(report.generation_datetime),
						formatTime(report.generation_datetime),
					].join(' - '),
				},
			],
		);
	}

	if (cashieringSession) {
		rowData.push(
			...[
				{ center: 'Session Datetime' },
				{
					center: `${formatDate(cashieringSession.date)} | ${[
						formatTime(cashieringSession.datetime_started),
						cashieringSession.datetime_ended
							? formatTime(cashieringSession.datetime_ended)
							: null,
					]
						.filter(Boolean)
						.join(' - ')}`,
				},
				{
					center: `Cashier: ${
						cashieringSession.user.employee_id
					} | ${getFullName(cashieringSession.user)}`,
				},
			],
		);
	}

	rowData.push(
		...[
			TXT_LINE_BREAK,
			...getTxtItemBlock([
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
					value: report.total_transactions,
				},
				{
					label: 'Opening Fund:',
					value: formatInPeso(report.opening_fund, PESO_SIGN),
				},
			]),
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Payment Received' },
			...getTxtItemBlock([
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
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Cash on Hand' },
			...getTxtItemBlock([
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
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Transaction Summary' },
			...getTxtItemBlock([
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
					value: [
						report.short_over < 0 ? '(' : '',
						formatInPeso(Math.abs(report.short_over), PESO_SIGN),
						report.short_over < 0 ? ')' : '',
					].join(''),
				},
			]),
			{ center: TXT_DIVIDER },
		],
	);

	if (user) {
		rowData.push(getTxtPrintDetails(user));
	}

	rowData.push(
		...[
			TXT_LINE_BREAK,
			...getTxtFooter(siteSettings),
			{ center: 'This Document Is Not Valid For Claim Of Input Tax' },
			{ center: 'Thank You!' },
		],
	);

	writeFile(rowData, reportTextFile);

	if (returnContent) {
		return reportTextFile.get();
	}

	reportTextFile.export(`XReadReport_${report.id}.txt`);

	return null;
};
