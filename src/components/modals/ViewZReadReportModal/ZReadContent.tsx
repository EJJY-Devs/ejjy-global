import { Typography } from 'antd';
import React from 'react';
import { EMPTY_CELL } from '../../../globals';
import { ZReadReport } from '../../../types';
import { formatDate, formatInPeso, formatTime } from '../../../utils';
import { Divider } from '../../Printing';
import { ItemBlock } from '../../Printing/ItemBlock';

const { Text } = Typography;

type Props = {
	report: ZReadReport;
};

export const ZReadContent = ({ report }: Props) => (
	<>
		<Text className="font-bold block text-center">Z-READING REPORT</Text>
		<Text className="mt-4 block text-center">Report Generation Datetime</Text>
		{report.generation_datetime && (
			<Text className="block text-center">
				{formatDate(report.generation_datetime)} -{' '}
				{formatTime(report.generation_datetime)}
			</Text>
		)}
		<Text className="block text-center">Day Datetime</Text>
		<Text className="block text-center">
			{formatDate(report.datetime_created)} |{' '}
			{[
				formatTime(report.datetime_created),
				report.generation_datetime
					? formatTime(report.generation_datetime)
					: null,
			]
				.filter(Boolean)
				.join(' - ')}
		</Text>

		<div className="mt-4">
			<ItemBlock
				items={[
					{
						label: 'Beg Sales Invoice #',
						value: report.beginning_or?.or_number || EMPTY_CELL,
					},
					{
						label: 'End Sales Invoice #',
						value: report.ending_or?.or_number || EMPTY_CELL,
					},
					{
						label: 'Beg Void #',
						value: EMPTY_CELL,
					},
					{
						label: 'End Void #',
						value: EMPTY_CELL,
					},
					{
						label: 'Beg Return #',
						value: EMPTY_CELL,
					},
					{
						label: 'End Return #',
						value: EMPTY_CELL,
					},
				]}
			/>
		</div>

		<div className="mt-4">
			<ItemBlock
				items={[
					{
						label: 'Trans. Count',
						value: report.total_transactions,
					},
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
		</div>
		<Divider />

		<ItemBlock
			items={[
				{
					label: 'Present Accum. Sales',
					value: formatInPeso(0),
				},
				{
					label: 'Previous Accum. Sales',
					value: formatInPeso(0),
				},
				{
					label: 'Sales for the Day',
					value: formatInPeso(0),
				},
			]}
		/>

		<div className="mt-4">
			<ItemBlock
				items={[
					{
						label: 'Cash Sales',
						value: formatInPeso(report.cash_sales),
						isIndented: true,
					},
					{
						label: 'Credit Sales',
						value: formatInPeso(report.credit_pay),
						isUnderlined: true,
						isIndented: true,
					},
				]}
			/>
		</div>
		<Divider />

		<Text className="w-full text-center block">Breakdown of Sales</Text>
		<ItemBlock
			items={[
				{
					label: 'VATable Sales',
					value: formatInPeso(0),
				},
				{
					label: 'VAT Amount',
					value: formatInPeso(0),
				},
				{
					label: 'VAT Exempt Sales',
					value: formatInPeso(0),
				},
				{
					label: 'Zero Rated Sales',
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
		<Divider />

		<Text className="w-full text-center block">Transaction Summary</Text>
		<ItemBlock
			items={[
				{
					label: 'Cash in Drawer',
					value: formatInPeso(0),
				},
				{
					label: 'Check',
					value: formatInPeso(0),
				},
				{
					label: 'Credit Card',
					value: formatInPeso(0),
				},
				{
					label: 'Opening fund',
					value: formatInPeso(0),
				},
				{
					label: 'Withdrawal',
					value: formatInPeso(0),
					isIndented: true,
					isParenthesized: true,
				},
				{
					label: 'Payment Received',
					value: formatInPeso(0),
					isIndented: true,
					isParenthesized: true,
				},
				{
					label: 'Short / Over',
					value: formatInPeso(0),
				},
			]}
		/>
	</>
);
