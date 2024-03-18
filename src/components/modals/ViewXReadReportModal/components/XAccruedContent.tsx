import React from 'react';
import { EMPTY_CELL } from '../../../../globals';
import { PESO_SIGN } from '../../../../print/helper-receipt';
import { XReadReport } from '../../../../types';
import { formatInPeso } from '../../../../utils';
import { Divider, ReceiptReportSummary } from '../../../Printing';
import { ItemBlock } from '../../../Printing/ItemBlock';

type Props = {
	report: XReadReport;
};

export const XAccruedContent = ({ report }: Props) => (
	<>
		<div style={{ fontWeight: 'bold' }}>Current Day Accumulated Report</div>
		<div style={{ fontWeight: 'bold' }}>X-READ (end session report)</div>

		<br />

		<div>INVOICE NUMBER</div>
		<ReceiptReportSummary
			items={[
				{
					label: 'Beg Invoice #',
					value: report.beginning_or?.or_number || EMPTY_CELL,
				},
				{
					label: 'End Invoice #',
					value: report.ending_or?.or_number || EMPTY_CELL,
				},
			]}
		/>

		<div>SALES</div>
		<ReceiptReportSummary
			items={[
				{
					label: 'Beg',
					value: formatInPeso(report.beginning_sales, PESO_SIGN),
				},
				{ label: 'Cur', value: formatInPeso(report.gross_sales, PESO_SIGN) },
				{ label: 'End', value: formatInPeso(report.ending_sales, PESO_SIGN) },
			]}
		/>

		<div>TRANSACTION COUNT</div>
		<ReceiptReportSummary
			items={[
				{ label: 'Beg', value: report.beginning_transactions_count },
				{ label: 'Cur', value: report.total_transactions },
				{ label: 'End', value: report.ending_transactions_count },
			]}
		/>

		<br />
		<div style={{ textAlign: 'center' }}>CURRENT SALES BREAKDOWN</div>
		<ItemBlock
			items={[
				{
					label: 'Cash Sales',
					value: formatInPeso(report.cash_sales, PESO_SIGN),
				},
				{
					label: 'Credit Sales',
					value: formatInPeso(report.credit_pay, PESO_SIGN),
					isUnderlined: true,
				},
				{
					label: 'Gross Sales',
					value: formatInPeso(report.gross_sales, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Breakdown of Sales</div>
		<ItemBlock
			items={[
				{
					label: 'VAT Exempt',
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
					label: 'ZERO Rated',
					value: formatInPeso(0, PESO_SIGN),
				},
			]}
		/>

		<Divider />

		<ItemBlock
			items={[
				{
					label: 'Gross Sales',
					value: formatInPeso(report.gross_sales, PESO_SIGN),
				},
				{
					label: 'Deduction',
					value: formatInPeso(0, PESO_SIGN),
					isIndented: true,
					isParenthesized: true,
				},
				{
					label: 'VAT Amount (12%)',
					value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
					isIndented: true,
					isUnderlined: true,
					isParenthesized: true,
				},
				{
					label: 'NET SALES',
					value: formatInPeso(report.net_sales, PESO_SIGN),
					contentStyle: { fontWeight: 'bold' },
					labelStyle: { fontWeight: 'bold' },
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Deductions</div>
		<ItemBlock
			items={[
				{
					label: 'Disc. SC',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Disc. PWD',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Disc. NAAC',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Disc. Solo Parent',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Disc. Others',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Return',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Void',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'TOTAL',
					value: formatInPeso(0, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>VAT Adjustment</div>
		<ItemBlock
			items={[
				{
					label: 'Disc. SC',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Disc. PWD',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Disc. Others',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'VAT on Returns',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Others',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'TOTAL',
					value: formatInPeso(0, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>VAT Payable</div>
		<ItemBlock
			items={[
				{
					label: 'VAT Amount (12%)',
					value: formatInPeso(report.vat_amount, PESO_SIGN),
				},
				{
					label: 'VAT Adj.',
					value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
					isUnderlined: true,
					isParenthesized: true,
				},
				{
					label: 'TOTAL',
					value: formatInPeso(report.vat_payable, PESO_SIGN),
				},
			]}
		/>
	</>
);
