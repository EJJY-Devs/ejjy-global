import { Typography } from 'antd';
import React from 'react';
import { EMPTY_CELL } from '../../../globals';
import { XReadReport } from '../../../types';
import {
	formatDate,
	formatInPeso,
	formatTime,
	getFullName,
} from '../../../utils';
import { Divider } from '../../Printing';
import { ItemBlock } from '../../Printing/ItemBlock';

const { Text } = Typography;

type Props = {
	report: XReadReport;
};

export const XReadContent = ({ report }: Props) => {
	const cashieringSession = report.cashiering_session;

	return (
		<>
			<Text className="font-bold block text-center">X-READING REPORT</Text>
			<Text className="mt-4 block text-center">Report Generation Datetime</Text>
			<Text className="block text-center">
				{formatDate(report.datetime_created)} -{' '}
				{formatTime(report.datetime_created)}
			</Text>
			{cashieringSession && (
				<>
					<Text className="block text-center">Session Datetime</Text>
					<Text className="block text-center">
						{formatDate(cashieringSession.date)} |{' '}
						{[
							formatTime(cashieringSession.datetime_started),
							cashieringSession.datetime_ended
								? formatTime(cashieringSession.datetime_ended)
								: null,
						]
							.filter(Boolean)
							.join(' - ')}
					</Text>
					<Text className="block text-center">
						Cashier: {cashieringSession.user.employee_id} |{' '}
						{getFullName(cashieringSession.user)}
					</Text>
				</>
			)}

			<div className="mt-4">
				<ItemBlock
					items={[
						{
							label: 'Beg Invoice #',
							value: report.beginning_or?.or_number || EMPTY_CELL,
						},
						{
							label: 'End Invoice #',
							value: report.ending_or?.or_number || EMPTY_CELL,
						},
						{
							label: 'Trans. Count',
							value: report.total_transactions,
						},
						{
							label: 'Opening Fund',
							value: formatInPeso(report.beginning_sales),
						},
					]}
				/>
			</div>

			<Divider />

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
				]}
			/>
			<Divider />

			<Text className="w-full text-center block">Payment Received</Text>
			<ItemBlock
				items={[
					{
						label: 'Cash',
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
						label: 'Total Payments',
						value: formatInPeso(0),
					},
				]}
			/>
			<Divider />

			<Text className="w-full text-center block">Transaction Adjustments</Text>
			<ItemBlock
				items={[
					{
						label: 'Void',
						value: formatInPeso(0),
					},
					{
						label: 'Refund',
						value: formatInPeso(0),
					},
					{
						label: 'Withdrawals',
						value: formatInPeso(0),
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
};
