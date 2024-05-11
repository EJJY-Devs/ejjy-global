import { DailySales, SiteSettings, User } from '../../types';
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

export const createDailySalesTxt = (
	dailySales: DailySales,
	siteSettings: SiteSettings,
	user?: User,
) => {
	const rowData: (RowData | string)[] = getTxtHeader({
		branchMachine: dailySales.branch_machine,
		siteSettings,
	});

	rowData.push(...[TXT_LINE_BREAK, { center: 'DAILY SALES REPORT' }]);

	if (dailySales.gross_sales === 0) {
		rowData.push(...[{ center: '(NO TRANSACTION)' }, TXT_LINE_BREAK]);
	}

	if (dailySales.generation_datetime) {
		rowData.push(
			...[
				{ center: 'Report Generation Datetime' },
				{
					center: [
						formatDate(dailySales.generation_datetime),
						formatTime(dailySales.generation_datetime),
					].join(' - '),
				},
			],
		);
	}

	rowData.push(
		...[
			{ center: 'Day Datetime' },
			{
				center: `${formatDate(dailySales.datetime_created)} | ${[
					dailySales.daily_sales_data.branch_day_open_datetime
						? formatTime(dailySales.daily_sales_data.branch_day_open_datetime)
						: null,
					dailySales.generation_datetime
						? formatTime(dailySales.generation_datetime)
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
					value: dailySales.beginning_or?.or_number || EMPTY_CELL,
				},
				{
					label: 'End Sales Invoice #:',
					value: dailySales.ending_or?.or_number || EMPTY_CELL,
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
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Sales Breakdown' },
			...getTxtItemBlock([
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
			{ center: 'Deductions' },
			...getTxtItemBlock([
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
				{
					label: '+Return',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: '+Void',
					value: formatInPeso(dailySales.void, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(dailySales.total_deductions, PESO_SIGN),
				},
			]),
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'VAT Adjustment' },
			...getTxtItemBlock([
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
				{
					label: '+VAT on Returns',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: '+Others',
					value: formatInPeso(dailySales.vat_others, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN),
				},
			]),
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'VAT Payable' },
			...getTxtItemBlock([
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
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			...getTxtItemBlock([
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
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Payment Received' },
			...getTxtItemBlock([
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
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Cash on Hand' },
			...getTxtItemBlock([
				{
					label: '+Payment Received',
					value: formatInPeso(dailySales.total_payment_received, PESO_SIGN),
				},
				{
					label: '+Opening fund',
					value: formatInPeso(dailySales.opening_fund, PESO_SIGN),
				},
				{
					label: '+Cash In',
					value: formatInPeso(dailySales.cash_in, PESO_SIGN),
				},
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
			{ center: TXT_DIVIDER },
		],
	);

	rowData.push(
		...[
			{ center: 'Transaction Summary' },
			...getTxtItemBlock([
				{
					label: '+Cash in Drawer',
					value: formatInPeso(dailySales.cash_in_drawer, PESO_SIGN),
				},
				{
					label: '-Cash on Hand',
					value: formatInPeso(dailySales.total_cash_on_hand, PESO_SIGN),
				},
				{
					label: '=(Short)/Over',
					value: [
						dailySales.short_over < 0 ? '(' : '',
						formatInPeso(Math.abs(dailySales.short_over), PESO_SIGN),
						dailySales.short_over < 0 ? ')' : '',
					].join(''),
				},
			]),
			{ center: TXT_DIVIDER },
		],
	);

	if (user) {
		rowData.push(getTxtPrintDetails(user));
	}

	rowData.push(...[TXT_LINE_BREAK, ...getTxtFooter(siteSettings)]);

	const reportTextFile = writeFile(rowData);

	reportTextFile.export(`DailySales_${dailySales.id}.txt`);

	return null;
};
