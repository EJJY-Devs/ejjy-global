import { Typography } from 'antd';
import React from 'react';
import { EMPTY_CELL } from '../../../globals';
import { ZReadReport } from '../../../types';
import { formatInPeso } from '../../../utils';
import { Divider, ReceiptReportSummary } from '../../Printing';
import { ItemBlock } from '../../Printing/ItemBlock';

const { Text } = Typography;

type Props = {
	report: ZReadReport;
};

export const ZAccruedContent = ({ report }: Props) => (
	<>
		<Text strong className="block">
			Current Day Accumulated Report
		</Text>
		<Text strong className="block">
			Z-READ (closing day report)
		</Text>

		<Text className="mt-4 block">INVOICE NUMBER</Text>
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

		<Text className="mt-2 block">SALES</Text>
		<ReceiptReportSummary
			items={[
				{ label: 'Beg', value: formatInPeso(report.beginning_sales) },
				{ label: 'Cur', value: formatInPeso(report.current_sales) },
				{ label: 'End', value: formatInPeso(report.ending_sales) },
			]}
		/>

		<Text className="mt-2 block">TRANSACTION COUNT</Text>
		<ReceiptReportSummary
			items={[
				{ label: 'Beg', value: report.beginning_transactions_count },
				{ label: 'Cur', value: report.total_transactions },
				{ label: 'End', value: report.ending_transactions_count },
			]}
		/>

		<ItemBlock
			items={[
				{
					label: 'Reset Counter',
					value: 0,
				},
				{
					label: 'Z Counter No.',
					value: 0,
				},
			]}
		/>

		<Text className="w-full mt-4 text-center block">
			ACCUMULATED SALES BREAKDOWN
		</Text>
		<ItemBlock
			items={[
				{
					label: 'Cash Sales',
					value: formatInPeso(report.cash_sales),
				},
				{
					label: 'Credit Sales',
					value: formatInPeso(report.credit_pay),
					isUnderlined: true,
				},
				{
					label: 'Sales for the Day',
					value: formatInPeso(report.gross_sales),
				},
			]}
		/>
		<Divider />

		<Text className="w-full text-center block">Breakdown of Sales</Text>
		<ItemBlock
			items={[
				{
					label: 'VAT Exempt',
					value: formatInPeso(report.vat_exempt),
				},
				{
					label: 'VATable Sales',
					value: formatInPeso(report.vat_sales),
				},
				{
					label: 'VAT Amount (12%)',
					value: formatInPeso(report.vat_amount),
				},
				{
					label: 'ZERO Rated',
					value: formatInPeso(0),
				},
			]}
		/>

		<Divider />

		<ItemBlock
			items={[
				{
					label: 'Gross Sales',
					value: formatInPeso(report.gross_sales),
				},
				{
					label: 'Deduction',
					value: formatInPeso(0),
					isIndented: true,
					isParenthesized: true,
				},
				{
					label: 'VAT Amount (12%)',
					value: formatInPeso(report.total_vat_adjusted),
					isIndented: true,
					isUnderlined: true,
					isParenthesized: true,
				},
				{
					label: 'NET SALES',
					value: formatInPeso(report.net_sales),
					contentStyle: { fontWeight: 'bold' },
					labelStyle: { fontWeight: 'bold' },
				},
			]}
		/>
		<Divider />

		<Text className="w-full text-center block">Deductions</Text>
		<ItemBlock
			items={[
				{
					label: 'Disc. SC',
					value: formatInPeso(0),
				},
				{
					label: 'Disc. PWD',
					value: formatInPeso(0),
				},
				{
					label: 'Disc. NAAC',
					value: formatInPeso(0),
				},
				{
					label: 'Disc. Solo Parent',
					value: formatInPeso(0),
				},
				{
					label: 'Disc. Others',
					value: formatInPeso(0),
				},
				{
					label: 'Return',
					value: formatInPeso(0),
				},
				{
					label: 'Void',
					value: formatInPeso(0),
				},
				{
					label: 'TOTAL',
					value: formatInPeso(0),
				},
			]}
		/>
		<Divider />

		<Text className="w-full text-center block">VAT Adjustment</Text>
		<ItemBlock
			items={[
				{
					label: 'Disc. SC',
					value: formatInPeso(0),
				},
				{
					label: 'Disc. PWD',
					value: formatInPeso(0),
				},
				{
					label: 'Disc. Others',
					value: formatInPeso(0),
				},
				{
					label: 'VAT on Returns',
					value: formatInPeso(0),
				},
				{
					label: 'Others',
					value: formatInPeso(0),
				},
				{
					label: 'TOTAL',
					value: formatInPeso(0),
				},
			]}
		/>
		<Divider />

		<Text className="w-full text-center block">VAT Payable</Text>
		<ItemBlock
			items={[
				{
					label: 'VAT Amount (12%)',
					value: formatInPeso(report.vat_amount),
				},
				{
					label: 'VAT Adj.',
					value: formatInPeso(report.total_vat_adjusted),
					isUnderlined: true,
					isParenthesized: true,
				},
				{
					label: 'TOTAL',
					value: formatInPeso(report.vat_payable),
				},
			]}
		/>
	</>
);
