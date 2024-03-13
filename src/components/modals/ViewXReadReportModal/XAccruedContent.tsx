import { Descriptions, Typography } from 'antd';
import React from 'react';
import { EMPTY_CELL } from '../../../globals';
import { XReadReport } from '../../../types';
import { formatInPeso } from '../../../utils';
import {
	Divider,
	ReceiptReportSummary,
	ReceiptUnderlinedValue,
} from '../../Printing';

const { Text } = Typography;

type Props = {
	report: XReadReport;
};

export const XAccruedContent = ({ report }: Props) => (
	<>
		<Text strong className="block">
			Current Day Accumulated Report
		</Text>
		<Text strong className="block">
			X-READ (end session report)
		</Text>

		<Text className="block mt-4">INVOICE NUMBER</Text>
		<ReceiptReportSummary
			data={[
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

		<Text className="block">SALES</Text>
		<ReceiptReportSummary
			data={[
				{ label: 'Beg', value: formatInPeso(report.beginning_sales) },
				{ label: 'Cur', value: formatInPeso(report.gross_sales) },
				{ label: 'End', value: formatInPeso(report.ending_sales) },
			]}
		/>

		<Text className="block">TRANSACTION COUNT</Text>
		<ReceiptReportSummary
			data={[
				{ label: 'Beg', value: report.beginning_transactions_count },
				{ label: 'Cur', value: report.total_transactions },
				{ label: 'End', value: report.ending_transactions_count },
			]}
		/>

		<Text className="w-full mt-4 text-center block">
			CURRENT SALES BREAKDOWN
		</Text>
		<Descriptions
			className="w-full"
			colon={false}
			column={1}
			contentStyle={{
				textAlign: 'right',
				display: 'block',
			}}
			labelStyle={{
				width: 200,
			}}
			size="small"
		>
			<Descriptions.Item label="Cash Sales">
				{formatInPeso(report.cash_sales)}&nbsp;
			</Descriptions.Item>
			<Descriptions.Item label="Credit Sales">
				<ReceiptUnderlinedValue
					postfix="&nbsp;"
					value={Number(report.credit_pay)}
				/>
			</Descriptions.Item>
			<Descriptions.Item label="Gross Sales">
				{formatInPeso(report.gross_sales)}&nbsp;
			</Descriptions.Item>
		</Descriptions>

		<Divider />
		<Text className="w-full text-center block">Breakdown of Sales</Text>
		<Descriptions
			className="w-full"
			colon={false}
			column={1}
			contentStyle={{
				textAlign: 'right',
				display: 'block',
			}}
			labelStyle={{
				width: 200,
			}}
			size="small"
		>
			<Descriptions.Item label="VAT Exempt">
				{formatInPeso(report.vat_exempt)}&nbsp;
			</Descriptions.Item>

			<Descriptions.Item label="VATable Sales">
				{formatInPeso(report.vat_sales)}&nbsp;
			</Descriptions.Item>
			<Descriptions.Item label="VAT Amount (12%)">
				{formatInPeso(report.vat_amount)}&nbsp;
			</Descriptions.Item>

			<Descriptions.Item label="ZERO Rated">
				{formatInPeso(0)}&nbsp;
			</Descriptions.Item>
		</Descriptions>

		<Divider />
		<Descriptions
			className="w-full"
			colon={false}
			column={1}
			contentStyle={{
				textAlign: 'right',
				display: 'block',
			}}
			labelStyle={{
				width: 200,
			}}
			size="small"
		>
			<Descriptions.Item label="Gross Sales">
				{formatInPeso(report.gross_sales)}&nbsp;
			</Descriptions.Item>
			<Descriptions.Item label="Deduction" labelStyle={{ paddingLeft: 30 }}>
				<ReceiptUnderlinedValue postfix=")" prefix="(" value={0} />
			</Descriptions.Item>

			<Descriptions.Item
				label="VAT Amount (12%)"
				labelStyle={{ paddingLeft: 30 }}
			>
				<ReceiptUnderlinedValue
					postfix=")"
					prefix="("
					value={report.total_vat_adjusted}
				/>
			</Descriptions.Item>
			<Descriptions.Item
				contentStyle={{ fontWeight: 'bold' }}
				label="NET SALES"
				labelStyle={{ fontWeight: 'bold' }}
			>
				{formatInPeso(report.net_sales)}&nbsp;
			</Descriptions.Item>
		</Descriptions>

		<Divider />
		<Text className="w-full text-center block">Deductions</Text>
		<Descriptions
			className="w-full"
			colon={false}
			column={1}
			contentStyle={{
				textAlign: 'right',
				display: 'block',
			}}
			labelStyle={{
				width: 200,
			}}
			size="small"
		>
			<Descriptions.Item label="Disc. SC">{null}</Descriptions.Item>
			<Descriptions.Item label="Disc. PWD">{null}</Descriptions.Item>
			<Descriptions.Item label="Disc. NAAC">{null}</Descriptions.Item>
			<Descriptions.Item label="Disc. Solo Parent">{null}</Descriptions.Item>
			<Descriptions.Item label="Disc. Others">{null}</Descriptions.Item>
			<Descriptions.Item label="Return">{null}</Descriptions.Item>
			<Descriptions.Item label="Void">{null}</Descriptions.Item>
			<Descriptions.Item label="TOTAL">{null}</Descriptions.Item>
		</Descriptions>

		<Divider />
		<Text className="w-full text-center block">VAT Adjustment</Text>
		<Descriptions
			className="w-full"
			colon={false}
			column={1}
			contentStyle={{
				textAlign: 'right',
				display: 'block',
			}}
			labelStyle={{
				width: 200,
			}}
			size="small"
		>
			<Descriptions.Item label="Disc. SC">{null}</Descriptions.Item>
			<Descriptions.Item label="Disc. PWD">{null}</Descriptions.Item>
			<Descriptions.Item label="Disc. Others">{null}</Descriptions.Item>
			<Descriptions.Item label="VAT on Returns">{null}</Descriptions.Item>
			<Descriptions.Item label="Others">{null}</Descriptions.Item>
			<Descriptions.Item label="TOTAL">{null}</Descriptions.Item>
		</Descriptions>

		<Divider />
		<Text className="w-full text-center block">VAT Payable</Text>
		<Descriptions
			className="w-full"
			colon={false}
			column={1}
			contentStyle={{
				textAlign: 'right',
				display: 'block',
			}}
			labelStyle={{
				width: 200,
			}}
			size="small"
		>
			<Descriptions.Item label="VAT Amount (12%)">
				{formatInPeso(report.vat_amount)}&nbsp;
			</Descriptions.Item>
			<Descriptions.Item label="VAT Adj.">
				<ReceiptUnderlinedValue
					postfix=")"
					prefix="("
					value={report.total_vat_adjusted}
				/>
			</Descriptions.Item>
			<Descriptions.Item label="TOTAL">
				{formatInPeso(report.vat_payable)}
				&nbsp;
			</Descriptions.Item>
		</Descriptions>
	</>
);
