import {
	BirReport,
	BranchMachine,
	SiteSettings,
	Transaction,
	User,
} from '../../../types';
import {
	BIR_REPORT_TITLES,
	BirNaacRow,
	BirReportAmountKey,
	BirSalesSummaryRow,
	BirSeniorPwdRow,
	BirSoloParentRow,
	getBirHeaderDetails,
	getBirNaacRows,
	getBirPwdRows,
	getBirSalesSummaryRows,
	getBirSeniorRows,
	getBirSoloParentRows,
} from './birReportHelper';
import {
	BirXlsxColumn,
	BirXlsxHeaderCell,
	buildBirReportXlsx,
	toExcelDate,
	toExcelDateOrText,
	toExcelIntegerOrText,
} from './birReportXlsxHelper';

const DATE_WIDTH = 14;
const AMOUNT_WIDTH = 18;
const ID_WIDTH = 20;
const NAME_WIDTH = 34;

const amountColumn = <Row>(
	value: (row: Row) => number | null,
	total = true,
): BirXlsxColumn<Row> => ({
	type: 'amount',
	width: AMOUNT_WIDTH,
	total,
	value,
});

// BIR Sales Summary (E1). Column order mirrors the table in printBirReport.
const salesSummaryAmount = (key: BirReportAmountKey, total = true) =>
	amountColumn<BirSalesSummaryRow>((row) => row.amounts[key], total);

const salesSummaryColumns: BirXlsxColumn<BirSalesSummaryRow>[] = [
	{ type: 'date', width: DATE_WIDTH, value: (row) => toExcelDate(row.date) },
	{ type: 'text', width: ID_WIDTH, value: (row) => row.beginningOrNumber },
	{ type: 'text', width: ID_WIDTH, value: (row) => row.endingOrNumber },

	// Running balances are not additive, so they get no totals.
	salesSummaryAmount('grand_accumulated_sales_ending_balance', false),
	salesSummaryAmount('grand_accumulated_sales_beginning_balance', false),
	salesSummaryAmount('sales_issue_with_manual'),
	salesSummaryAmount('gross_sales_for_the_day'),

	salesSummaryAmount('vatable_sales'),
	salesSummaryAmount('vat_amount'),
	salesSummaryAmount('vat_exempt_sales'),
	salesSummaryAmount('zero_rated_sales'),

	salesSummaryAmount('sc_discount'),
	salesSummaryAmount('pwd_discount'),
	salesSummaryAmount('naac_discount'),
	salesSummaryAmount('sp_discount'),
	salesSummaryAmount('others_discount'),
	salesSummaryAmount('returns'),
	salesSummaryAmount('void'),
	salesSummaryAmount('total_deductions'),

	salesSummaryAmount('vat_sc_discount'),
	salesSummaryAmount('vat_pwd_discount'),
	salesSummaryAmount('vat_others_discount'),
	salesSummaryAmount('vat_returns'),
	salesSummaryAmount('vat_others'),
	salesSummaryAmount('total_vat_adjusted'),

	salesSummaryAmount('vat_payable'),
	salesSummaryAmount('net_sales'),
	salesSummaryAmount('sales_overrun_or_overflow'),
	salesSummaryAmount('total_income'),
	{ type: 'integer', width: 14, value: (row) => row.resetCounter },
	{ type: 'integer', width: 14, value: (row) => row.zCounter },
	{ type: 'text', width: 24, value: (row) => row.remarks },
];

const salesSummaryHeaderRows: BirXlsxHeaderCell[][] = [
	[
		{ label: 'Date', rowSpan: 3 },
		{ label: 'Beginning SI/OR No.', rowSpan: 3 },
		{ label: 'Ending SI/OR No.', rowSpan: 3 },

		{ label: 'Grand Accum. Sales Ending Balance', rowSpan: 3 },
		{ label: 'Grand Accum. Sales Beg. Balance', rowSpan: 3 },
		{ label: 'Sales Issued w/ Manual SI/OR (per RR 16-2018)', rowSpan: 3 },
		{ label: 'Gross Sales of the Day', rowSpan: 3 },

		{ label: 'VATable Sales', rowSpan: 3 },
		{ label: 'VAT Amount', rowSpan: 3 },
		{ label: 'VAT-Exempt Sales', rowSpan: 3 },
		{ label: 'Zero Rated Sales', rowSpan: 3 },

		{ label: 'Deductions', colSpan: 8 },
		{ label: 'Adjustments on VAT', colSpan: 6 },

		{ label: 'VAT Payable', rowSpan: 3 },
		{ label: 'Net Sales', rowSpan: 3 },
		{ label: 'Sales Overrun/Overflow', rowSpan: 3 },
		{ label: 'Total Income', rowSpan: 3 },
		{ label: 'Reset Counter', rowSpan: 3 },
		{ label: 'Z-Counter', rowSpan: 3 },
		{ label: 'Remarks', rowSpan: 3 },
	],
	[
		{ label: 'Discount', colSpan: 5 },
		{ label: 'Returns', rowSpan: 2 },
		{ label: 'Void', rowSpan: 2 },
		{ label: 'Total Deductions', rowSpan: 2 },

		{ label: 'Discount', colSpan: 3 },
		{ label: 'VAT on Returns', rowSpan: 2 },
		{ label: 'Others', rowSpan: 2 },
		{ label: 'Total VAT Adjustment', rowSpan: 2 },
	],
	[
		{ label: 'SC' },
		{ label: 'PWD' },
		{ label: 'NAAC' },
		{ label: 'Solo Parent' },
		{ label: 'Others' },
		{ label: 'SC' },
		{ label: 'PWD' },
		{ label: 'Others' },
	],
];

export const exportBirReportXlsx = (
	birReports: BirReport[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) =>
	buildBirReportXlsx({
		sheetName: 'BIR Sales Summary',
		title: BIR_REPORT_TITLES.SALES_SUMMARY,
		headerDetails: getBirHeaderDetails(siteSettings, user, branchMachine),
		headerRows: salesSummaryHeaderRows,
		columns: salesSummaryColumns,
		rows: getBirSalesSummaryRows(birReports),
		getRowDate: (row) => row.date,
	});

// SC and PWD share one layout.
const seniorPwdColumns: BirXlsxColumn<BirSeniorPwdRow>[] = [
	{ type: 'date', width: DATE_WIDTH, value: (row) => toExcelDate(row.date) },
	{ type: 'text', width: NAME_WIDTH, value: (row) => row.name },
	{ type: 'text', width: ID_WIDTH, value: (row) => row.id },
	{ type: 'text', width: ID_WIDTH, value: (row) => row.tin },
	{ type: 'text', width: ID_WIDTH, value: (row) => row.orNumber },
	amountColumn((row) => row.sales),
	amountColumn((row) => row.vatAmount),
	amountColumn((row) => row.vatExempt),
	amountColumn((row) => row.deduction5Percent),
	amountColumn((row) => row.deduction20Percent),
	amountColumn((row) => row.netSales),
];

const seniorPwdHeaderRows = (
	nameLabel: string,
	idLabel: string,
	tinLabel: string,
): BirXlsxHeaderCell[][] => [
	[
		{ label: 'Date', rowSpan: 2 },
		{ label: nameLabel, rowSpan: 2 },
		{ label: idLabel, rowSpan: 2 },
		{ label: tinLabel, rowSpan: 2 },
		{ label: 'SI / OR Number', rowSpan: 2 },
		{ label: 'Sales (inclusive of VAT)', rowSpan: 2 },
		{ label: 'VAT Amount', rowSpan: 2 },
		{ label: 'VAT Exempt Sales', rowSpan: 2 },
		{ label: 'Deductions', colSpan: 2 },
		{ label: 'Net Sales', rowSpan: 2 },
	],
	[{ label: '5%' }, { label: '20%' }],
];

export const exportBirReportPWDXlsx = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) =>
	buildBirReportXlsx({
		sheetName: 'PWD Sales Book',
		title: BIR_REPORT_TITLES.PWD,
		headerDetails: getBirHeaderDetails(siteSettings, user, branchMachine),
		headerRows: seniorPwdHeaderRows(
			'Name of Person with Disability (PWD)',
			'PWD ID No.',
			'PWD TIN',
		),
		columns: seniorPwdColumns,
		rows: getBirPwdRows(transactions),
		getRowDate: (row) => row.date,
	});

export const exportBirReportSCXlsx = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) =>
	buildBirReportXlsx({
		sheetName: 'SC Sales Book',
		title: BIR_REPORT_TITLES.SC,
		headerDetails: getBirHeaderDetails(siteSettings, user, branchMachine),
		headerRows: seniorPwdHeaderRows(
			'Name of Senior Citizen (SC)',
			'OSCA ID No./ SC ID No.',
			'SC TIN',
		),
		columns: seniorPwdColumns,
		rows: getBirSeniorRows(transactions),
		getRowDate: (row) => row.date,
	});

export const exportBirReportNAACXlsx = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) =>
	buildBirReportXlsx({
		sheetName: 'NAAC Sales Book',
		title: BIR_REPORT_TITLES.NAAC,
		headerDetails: getBirHeaderDetails(siteSettings, user, branchMachine),
		headerRows: [
			[
				{ label: 'Date' },
				{ label: 'Name of National Athlete/Coach' },
				{ label: 'PNSTM ID No..' },
				{ label: 'SI / OR Number' },
				{ label: 'Gross Sales/Receipts' },
				{ label: 'Sales Discount (VAT+Disc)' },
				{ label: 'Net Sales' },
			],
		],
		columns: [
			{
				type: 'date',
				width: DATE_WIDTH,
				value: (row) => toExcelDate(row.date),
			},
			{ type: 'text', width: NAME_WIDTH, value: (row) => row.coach },
			{ type: 'text', width: ID_WIDTH, value: (row) => row.id },
			{ type: 'text', width: ID_WIDTH, value: (row) => row.orNumber },
			amountColumn<BirNaacRow>((row) => row.grossSales),
			amountColumn<BirNaacRow>((row) => row.discount),
			amountColumn<BirNaacRow>((row) => row.netSales),
		],
		rows: getBirNaacRows(transactions),
		getRowDate: (row) => row.date,
	});

export const exportBirReportSPXlsx = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) =>
	buildBirReportXlsx({
		sheetName: 'SP Sales Book',
		title: BIR_REPORT_TITLES.SP,
		headerDetails: getBirHeaderDetails(siteSettings, user, branchMachine),
		headerRows: [
			[
				{ label: 'Date' },
				{ label: 'Name of Solo Parent' },
				{ label: 'SPIC No.' },
				{ label: 'Name of child' },
				{ label: 'Birth Date of child' },
				{ label: 'Age of child' },
				{ label: 'SI / OR Number' },
				{ label: 'Gross Sales' },
				{ label: 'Discount (VAT+Disc)' },
				{ label: 'Net Sales' },
			],
		],
		columns: [
			{
				type: 'date',
				width: DATE_WIDTH,
				value: (row) => toExcelDate(row.date),
			},
			{ type: 'text', width: NAME_WIDTH, value: (row) => row.name },
			{ type: 'text', width: ID_WIDTH, value: (row) => row.id },
			{ type: 'text', width: NAME_WIDTH, value: (row) => row.childName },
			{
				type: 'date',
				width: DATE_WIDTH,
				value: (row) => toExcelDateOrText(row.childBirthdate),
			},
			{
				type: 'integer',
				width: 12,
				value: (row) => toExcelIntegerOrText(row.childAge),
			},
			{ type: 'text', width: ID_WIDTH, value: (row) => row.orNumber },
			amountColumn<BirSoloParentRow>((row) => row.grossSales),
			amountColumn<BirSoloParentRow>((row) => row.discount),
			amountColumn<BirSoloParentRow>((row) => row.netSales),
		],
		rows: getBirSoloParentRows(transactions),
		getRowDate: (row) => row.date,
	});
