import { SiteSettings, User, ZReadReport } from '../../types';
import { formatDate, formatInPeso, formatTime } from '../../utils';
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

export const createZReadTxt = (
	report: ZReadReport,
	siteSettings: SiteSettings,
	user?: User,
	returnContent = false,
) => {
	const rowData: (RowData | string)[] = getTxtHeader({
		branchMachine: report.branch_machine,
		siteSettings,
	});

	rowData.push(...[TXT_LINE_BREAK, { center: 'Z-READING REPORT' }]);

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

	rowData.push(
		...[
			{ center: 'Day Datetime' },
			{
				center: `${formatDate(report.datetime_created)} | ${[
					report.branch_day_open_datetime
						? formatTime(report.branch_day_open_datetime)
						: null,
					report.generation_datetime
						? formatTime(report.generation_datetime)
						: null,
				]
					.filter(Boolean)
					.join(' - ')}`,
			},
		],
	);

	rowData.push(
		...[
			TXT_LINE_BREAK,
			...getTxtItemBlock([
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
				{
					label: 'Beg Return #:',
					value: EMPTY_CELL,
				},
				{
					label: 'End Return #:',
					value: EMPTY_CELL,
				},
			]),
			TXT_LINE_BREAK,
			...getTxtItemBlock([
				{
					label: 'Reset Counter No.:',
					value: report.reset_counter,
				},
				{
					label: 'Z Counter No.:',
					value: report.id,
				},
			]),
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			...getTxtItemBlock([
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
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			...getTxtItemBlock([
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
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Current Day Payment Received' },
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
			{ center: 'Current Day Cash on Hand' },
			...getTxtItemBlock([
				{
					label: '+Payment Received',
					value: formatInPeso(report.total_payment_received, PESO_SIGN),
				},
				{
					label: '+Opening fund',
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
			{ center: 'Current Day Transaction Summary' },
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

	rowData.push(
		...[
			{ center: 'Accumulated Sales Breakdown' },
			...getTxtItemBlock([
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
				{
					label: 'Zero Rated Sales',
					value: formatInPeso(0, PESO_SIGN),
				},
			]),
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Accumulated Deductions' },
			...getTxtItemBlock([
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
				{
					label: '+Return',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: '+Void',
					value: formatInPeso(report.void, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(report.total_deductions, PESO_SIGN),
				},
			]),
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Accumulated VAT Adjustment' },
			...getTxtItemBlock([
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
				{
					label: '+VAT on Returns',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: '+Others',
					value: formatInPeso(report.vat_others, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
				},
			]),
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Accumulated VAT Payable' },
			...getTxtItemBlock([
				{
					label: '+VAT Amount (12%)',
					value: formatInPeso(report.vat_amount, PESO_SIGN),
				},
				{
					label: '-VAT Adjustment',
					value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(report.vat_payable, PESO_SIGN),
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

	const reportTextFile = writeFile(rowData);

	if (returnContent) {
		return reportTextFile.get();
	}

	reportTextFile.export(`ZReadReport_${report.id}.txt`);

	return null;
};
