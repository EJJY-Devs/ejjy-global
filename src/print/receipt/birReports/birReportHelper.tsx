/* eslint-disable react-refresh/only-export-components */
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { SpecialDiscountCode, specialDiscountCodes } from '../../../globals';
import {
	BirReport,
	BranchMachine,
	SiteSettings,
	Transaction,
	User,
} from '../../../types';
import {
	formatDateTime,
	formatInPeso,
	getDiscountFields,
	NaacFields,
	PWDFields,
	SCFields,
	SPFields,
} from '../../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../../helper-receipt';

// The BIR Sales Summary (E1) genuinely has ~29 columns and needs the full
// ~2000px table to lay them out without crushing every cell. The annex
// reports (NAAC, PWD, SC, Solo Parent) have far fewer columns; forcing them
// onto the same 2000px-wide table stretched every column way past its
// content, and — since these render into a narrower off-screen container for
// the single-page PDF capture (see renderA4SinglePagePdf) — the oversized
// table spilled past the container and got clipped/overlapped at the page's
// right edge instead of shrinking to fit. 'compact' lets these tables size
// to their own content instead of being pinned to the E1 report's width.
type BirReportStylesVariant = 'wide' | 'compact';

export const birReportStyles = (variant: BirReportStylesVariant = 'wide') => {
	const isWide = variant === 'wide';

	return React.createElement('style', {}, [
		`
    .bir-reports-pdf {
      ${isWide ? 'max-width: 2300px;\n      min-width: 2000px;' : ''}
    }

    .bir-reports-pdf * {
      font-family: Helvetica, monospace;
      font-size: 12px;
    }

    .bir-report-header div.details,
    .bir-report-header .title {
      width: 100%;
    }

    table.bir-reports {
      border-collapse: collapse;
      ${isWide ? 'min-width: 2000px;\n      width: 100%;' : 'width: auto;\n      margin: 0 auto;'}
    }

    table.bir-reports th,
    table.bir-reports .nested-row td {
      min-width: 60px;
    }

    table.bir-reports th[colspan] {
      background-color: #ADB9CA;
    }

    table.bir-reports th,
    table.bir-reports .nested-row td {
      background-color: #BDD6EE;
    }

    table.bir-reports th,
    table.bir-reports td {
      border: 1px solid black;
      text-align: center;
      vertical-align: middle;
      padding: 6px 4px;
      box-sizing: border-box;
      overflow-wrap: break-word;
      word-break: normal;
      line-height: 1.3;
    }

    .bir-reports-pdf .title {
      text-align: center;
      font-weight: bold;
      margin-bottom:4px;
    }
  `,
	]);
};

// Raw header values shared by the PDF header (BirHeader) and the Excel header
// block so both outputs print the same lines.
export type BirHeaderDetails = {
	address?: string;
	dateGenerated: Dayjs;
	minNumber?: string;
	proprietor?: string;
	serialNumber?: string;
	software: string;
	tin?: string;
	// UserID is the authorizer's (the user generating this report) employee ID.
	userId: User['employee_id'];
};

export const getBirHeaderDetails = (
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
): BirHeaderDetails => ({
	proprietor: siteSettings.proprietor,
	address: siteSettings.address_of_tax_payer,
	tin: siteSettings.tin,
	software: `${siteSettings.app_description ?? ''} ${siteSettings.product_version ?? ''}`,
	serialNumber: branchMachine?.storage_serial_number,
	minNumber: branchMachine?.machine_identification_number,
	dateGenerated: dayjs(),
	userId: user.employee_id,
});

type BirHeaderProps = {
	branchMachine?: BranchMachine;
	siteSettings: SiteSettings;
	title: string;
	user: User;
};
// Inline styles here are deliberate, not decorative: this markup is dropped
// straight into the host app's live DOM for html2canvas capture (see
// renderA4SinglePagePdf), so it's exposed to whatever global CSS that app
// already has for very generic class names like "details"/"title". A cascade
// collision there previously collapsed each line down to single-word width,
// wrapping the proprietor name/address/TIN one word per line. Inline styles
// win over any external stylesheet the host page happens to define for these
// class names, so the layout stays correct regardless of what else is on the
// page.
const detailLineStyle: React.CSSProperties = {
	width: '100%',
	display: 'block',
	whiteSpace: 'normal',
};

export const BirHeader = ({
	branchMachine,
	siteSettings,
	title,
	user,
}: BirHeaderProps) => {
	const details = getBirHeaderDetails(siteSettings, user, branchMachine);

	return (
		<div className="bir-report-header" style={{ width: '100%' }}>
			<div className="details" style={detailLineStyle}>
				{details.proprietor}
			</div>
			<div className="details" style={detailLineStyle}>
				{details.address}
			</div>
			<div className="details" style={detailLineStyle}>
				{details.tin}
			</div>

			<br />

			<div className="details" style={detailLineStyle}>
				{details.software}
			</div>
			<div className="details" style={detailLineStyle}>
				SN: {details.serialNumber}
			</div>
			<div className="details" style={detailLineStyle}>
				MIN: {details.minNumber}
			</div>
			{/* POS Terminal No. is intentionally left blank for now. */}
			<div className="details" style={detailLineStyle}>
				POS Terminal No.:
			</div>
			<div className="details" style={detailLineStyle}>
				Date Generated: {formatDateTime(details.dateGenerated, false)}
			</div>
			<div className="details" style={detailLineStyle}>
				UserID: {details.userId}
			</div>

			<br />

			<div
				className="title"
				style={{ ...detailLineStyle, textAlign: 'center', fontWeight: 'bold' }}
			>
				{title}
			</div>
		</div>
	);
};

// Rows shared by the PDF and Excel builders. `null` means "leave the cell
// blank"; amounts are real numbers and each output does its own formatting.
export const toAmount = (value: unknown): number | null => {
	if (value === undefined) {
		return null;
	}

	const amount = Number(value);
	return Number.isNaN(amount) ? null : amount;
};

export const formatPesoCell = (amount: number | null) =>
	amount === null ? EMPTY_CELL : formatInPeso(amount, PESO_SIGN);

export const NO_TRANSACTION_REMARK = 'No transaction';

export const BIR_REPORT_TITLES = {
	SALES_SUMMARY: 'BIR SALES SUMMARY REPORT',
	NAAC: 'National Athletes and Coaches Sales Book/Report',
	PWD: 'Persons with Disability Sales Book/Report',
	SC: 'Senior Citizen Sales Book/Report',
	SP: 'Solo Parents Sales Book/Report',
};

export const BIR_REPORT_AMOUNT_KEYS = [
	'grand_accumulated_sales_ending_balance',
	'grand_accumulated_sales_beginning_balance',
	'sales_issue_with_manual',
	'gross_sales_for_the_day',
	'vatable_sales',
	'vat_amount',
	'vat_exempt_sales',
	'zero_rated_sales',
	'sc_discount',
	'pwd_discount',
	'naac_discount',
	'sp_discount',
	'others_discount',
	'returns',
	'void',
	'total_deductions',
	'vat_sc_discount',
	'vat_pwd_discount',
	'vat_others_discount',
	'vat_returns',
	'vat_others',
	'total_vat_adjusted',
	'vat_payable',
	'net_sales',
	'sales_overrun_or_overflow',
	'total_income',
] as const;

export type BirReportAmountKey = (typeof BIR_REPORT_AMOUNT_KEYS)[number];

export type BirSalesSummaryRow = {
	amounts: Record<BirReportAmountKey, number | null>;
	beginningOrNumber: string | null;
	date: string;
	endingOrNumber: string | null;
	remarks: string | null;
	resetCounter: number | null;
	zCounter: number | null;
};

export const getBirSalesSummaryRows = (
	birReports: BirReport[],
): BirSalesSummaryRow[] =>
	birReports.map((report) => {
		const hasNoTransaction = Number(report.gross_sales_for_the_day) === 0;

		const amounts = {} as Record<BirReportAmountKey, number | null>;
		BIR_REPORT_AMOUNT_KEYS.forEach((key) => {
			amounts[key] = hasNoTransaction ? null : toAmount(report[key]);
		});

		return {
			date: report.date,
			beginningOrNumber: hasNoTransaction
				? null
				: report?.beginning_or?.or_number ?? null,
			endingOrNumber: hasNoTransaction
				? null
				: report?.ending_or?.or_number ?? null,
			amounts,
			resetCounter: hasNoTransaction ? null : report.reset_counter,
			zCounter: hasNoTransaction ? null : report.z_counter,
			remarks: hasNoTransaction ? NO_TRANSACTION_REMARK : report.remarks,
		};
	});

export type BirSeniorPwdRow = {
	date: string;
	deduction5Percent: number;
	deduction20Percent: number | null;
	id: string;
	name: string;
	netSales: number | null;
	orNumber: string;
	sales: number | null;
	tin: string;
	vatAmount: number | null;
	vatExempt: number | null;
};

// The SC and PWD books share one layout; only the discount code (and so the
// additional-fields lookup) differs.
const getBirSeniorPwdRows = (
	transactions: Transaction[],
	discountCode: SpecialDiscountCode,
): BirSeniorPwdRow[] =>
	transactions.map((transaction) => {
		const fields = getDiscountFields(
			discountCode,
			transaction.discount_option_additional_fields_values || '',
		) as SCFields | PWDFields;

		return {
			date: transaction.datetime_created,
			name: fields.name,
			id: fields.id,
			tin: fields.tin,
			orNumber: transaction.invoice.or_number,
			sales: toAmount(transaction.total_amount),
			vatAmount: toAmount(transaction.invoice.vat_amount),
			vatExempt: toAmount(transaction.invoice.vat_exempt),
			deduction5Percent: 0,
			deduction20Percent: toAmount(transaction.overall_discount),
			netSales: toAmount(transaction.invoice.vat_sales),
		};
	});

export const getBirSeniorRows = (transactions: Transaction[]) =>
	getBirSeniorPwdRows(transactions, specialDiscountCodes.SENIOR_CITIZEN);

export const getBirPwdRows = (transactions: Transaction[]) =>
	getBirSeniorPwdRows(
		transactions,
		specialDiscountCodes.PERSONS_WITH_DISABILITY,
	);

export type BirNaacRow = {
	coach: string;
	date: string;
	discount: number | null;
	grossSales: number | null;
	id: string;
	netSales: number | null;
	orNumber: string;
};

export const getBirNaacRows = (transactions: Transaction[]): BirNaacRow[] =>
	transactions.map((transaction) => {
		const fields = getDiscountFields(
			specialDiscountCodes.NATIONAL_ATHLETES_AND_COACHES,
			transaction.discount_option_additional_fields_values || '',
		) as NaacFields;

		return {
			date: transaction.datetime_created,
			coach: fields.coach,
			id: fields.id,
			orNumber: transaction.invoice.or_number,
			grossSales: toAmount(transaction.gross_amount),
			discount: toAmount(transaction.overall_discount),
			netSales: toAmount(transaction.invoice.vat_sales),
		};
	});

export type BirSoloParentRow = {
	childAge: string;
	childBirthdate: string;
	childName: string;
	date: string;
	discount: number | null;
	grossSales: number | null;
	id: string;
	name: string;
	netSales: number | null;
	orNumber: string;
};

export const getBirSoloParentRows = (
	transactions: Transaction[],
): BirSoloParentRow[] =>
	transactions.map((transaction) => {
		const fields = getDiscountFields(
			specialDiscountCodes.SOLO_PARENTS,
			transaction.discount_option_additional_fields_values || '',
		) as SPFields;

		return {
			date: transaction.datetime_created,
			name: fields.name,
			id: fields.id,
			childName: fields.childName,
			childBirthdate: fields.childBirthdate,
			childAge: fields.childAge,
			orNumber: transaction.invoice.or_number,
			grossSales: toAmount(transaction.gross_amount),
			discount: toAmount(transaction.overall_discount),
			netSales: toAmount(transaction.invoice.vat_sales),
		};
	});
