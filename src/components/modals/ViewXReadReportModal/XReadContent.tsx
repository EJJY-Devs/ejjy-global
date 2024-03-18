import React from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { EMPTY_CELL } from '../../../globals';
import { PESO_SIGN } from '../../../print/helper-receipt';
import { SiteSettings, User, XReadReport } from '../../../types';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	formatTime,
	getFullName,
} from '../../../utils';
import { Divider, ReceiptFooter, ReceiptHeader } from '../../Printing';
import { ItemBlock } from '../../Printing/ItemBlock';

interface Props {
	report: XReadReport;
	siteSettings: SiteSettings;
	user: User;
	isForPrint?: boolean;
}

export const XReadContent = ({
	report,
	siteSettings,
	user,
	isForPrint,
}: Props) => {
	const cashieringSession = report.cashiering_session;
	const isAccrued = !!report.generated_by;

	return (
		<>
			{report.gross_sales === 0 && !isForPrint && (
				<img
					alt="no transaction"
					className="w-full absolute top-0 left-0 pointer-events-none"
					src={imgNoTransaction}
				/>
			)}

			<ReceiptHeader
				branchMachine={report.branch_machine}
				siteSettings={siteSettings}
			/>

			<div className="mt-4">
				<>
					<div style={{ fontWeight: 'bold', textAlign: 'center' }}>
						{isAccrued ? 'X-ACCRUED REPORT' : 'X-READING REPORT'}
					</div>

					<br />

					<div style={{ textAlign: 'center' }}>Report Generation Datetime</div>
					<div style={{ textAlign: 'center' }}>
						{formatDate(report.datetime_created)} -{' '}
						{formatTime(report.datetime_created)}
					</div>
					{cashieringSession && (
						<>
							<div style={{ textAlign: 'center' }}>Session Datetime</div>
							<div style={{ textAlign: 'center' }}>
								{formatDate(cashieringSession.date)} |{' '}
								{[
									formatTime(cashieringSession.datetime_started),
									cashieringSession.datetime_ended
										? formatTime(cashieringSession.datetime_ended)
										: null,
								]
									.filter(Boolean)
									.join(' - ')}
							</div>
							<div style={{ textAlign: 'center' }}>
								Cashier: {cashieringSession.user.employee_id} |{' '}
								{getFullName(cashieringSession.user)}
							</div>
						</>
					)}

					<br />

					<div>
						<ItemBlock
							items={[
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
									label: 'Opening Fund/Cash In:',
									value: formatInPeso(report.beginning_sales, PESO_SIGN),
								},
							]}
						/>
					</div>
					<Divider />

					<div style={{ textAlign: 'center' }}>Current Sales</div>
					<ItemBlock
						items={[
							{
								label: '+Cash Sales',
								value: formatInPeso(report.cash_sales, PESO_SIGN),
							},
							{
								label: '+Credit Sales',
								value: formatInPeso(report.credit_pay, PESO_SIGN),
							},
							{
								label: '=Total',
								value: 'WIP',
							},
						]}
					/>
					<Divider />

					<div style={{ textAlign: 'center' }}>Sales Breakdown</div>
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

					{!isAccrued && (
						<>
							<div style={{ textAlign: 'center' }}>Deductions</div>
							<ItemBlock
								items={[
									{
										label: '+Disc. SC',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+Disc. PWD',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+Disc. NAAC',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+Disc. Solo Parent',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+Disc. Others',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+Return',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+Void',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '=Total',
										value: formatInPeso(0, PESO_SIGN),
									},
								]}
							/>
							<Divider />

							<div style={{ textAlign: 'center' }}>VAT Adjustment</div>
							<ItemBlock
								items={[
									{
										label: '+Disc. SC',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+Disc. PWD',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+Disc. Others',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+VAT on Returns',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '+Others',
										value: formatInPeso(0, PESO_SIGN),
									},
									{
										label: '=Total',
										value: formatInPeso(0, PESO_SIGN),
									},
								]}
							/>
							<Divider />

							<div style={{ textAlign: 'center' }}>VAT Payable</div>
							<ItemBlock
								items={[
									{
										label: '+VAT Amount (12%)',
										value: formatInPeso(report.vat_amount, PESO_SIGN),
									},
									{
										label: '-VAT Adjustment',
										value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
										isUnderlined: true,
										isParenthesized: true,
									},
									{
										label: '=Total',
										value: formatInPeso(report.vat_payable, PESO_SIGN),
									},
								]}
							/>
							<Divider />
						</>
					)}

					<div style={{ textAlign: 'center' }}>Payment Received</div>
					<ItemBlock
						items={[
							{
								label: '+Cash',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: '+Check',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: '+Credit Card',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: '=Total',
								value: formatInPeso(0, PESO_SIGN),
							},
						]}
					/>
					<Divider />

					<div style={{ textAlign: 'center' }}>Transaction Adjustments</div>
					<ItemBlock
						items={[
							{
								label: 'Void',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: 'Refund',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: 'Withdrawals/Cash Out',
								value: formatInPeso(0, PESO_SIGN),
							},
						]}
					/>
					<Divider />

					<div style={{ textAlign: 'center' }}>Transaction Summary</div>
					<ItemBlock
						items={[
							{
								label: '+Cash in Drawer',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: '+Check',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: '+Credit Card',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: '+Opening fund',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: '-Withdrawal',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: '-Payment Received',
								value: formatInPeso(0, PESO_SIGN),
							},
							{
								label: '=Short / Over',
								value: formatInPeso(0, PESO_SIGN),
							},
						]}
					/>
				</>
			</div>

			<Divider />

			<div>
				GDT:{' '}
				{report.generation_datetime
					? formatDateTime(report.generation_datetime)
					: EMPTY_CELL}
			</div>
			<div>
				PDT:{' '}
				{report.printing_datetime
					? formatDateTime(report.printing_datetime)
					: EMPTY_CELL}
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					C: {report?.cashiering_session?.user.employee_id || EMPTY_CELL}
				</div>
				<div>
					PB:{' '}
					{user?.employee_id || report?.generated_by?.employee_id || EMPTY_CELL}
				</div>
			</div>

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
		</>
	);
};
