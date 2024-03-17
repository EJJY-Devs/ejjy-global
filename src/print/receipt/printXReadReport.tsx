import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SiteSettings, User, XReadReport } from '../../types';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	formatTime,
	getFullName,
} from '../../utils';
import {
	Divider,
	EMPTY_CELL,
	ItemBlock,
	ReceiptReportSummary,
	appendHtmlElement,
	getFooter,
	getHeader,
	getPageStyleObject,
	print,
} from '../helper-receipt';

export const printXReadReport = (
	report: XReadReport,
	siteSettings: SiteSettings,
	user: User,
	isPdf = false,
) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<>
			<div className="container" style={getPageStyleObject()}>
				{getHeader(siteSettings, report.branch_machine)}

				{report?.gross_sales === 0 && (
					<>
						<br />
						<div style={{ textAlign: 'center' }}>NO TRANSACTION</div>
					</>
				)}
				<br />

				<div>
					{report.generated_by ? (
						<XAccruedContent report={report} />
					) : (
						<XReadContent report={report} />
					)}
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
						{user?.employee_id ||
							report?.generated_by?.employee_id ||
							EMPTY_CELL}
					</div>
				</div>

				<br />

				{getFooter(siteSettings)}
			</div>
		</>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'XRead Report');
};

type Props = {
	report: XReadReport;
};

const XReadContent = ({ report }: Props) => {
	const cashieringSession = report.cashiering_session;

	return (
		<>
			<div style={{ fontWeight: 'bold', textAlign: 'center' }}>
				X-READING REPORT
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

			<div style={{ textAlign: 'center' }}>Payment Received</div>
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

			<div style={{ textAlign: 'center' }}>Transaction Adjustments</div>
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

			<div style={{ textAlign: 'center' }}>Transaction Summary</div>
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

const XAccruedContent = ({ report }: Props) => (
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
				{ label: 'Beg', value: formatInPeso(report.beginning_sales) },
				{ label: 'Cur', value: formatInPeso(report.gross_sales) },
				{ label: 'End', value: formatInPeso(report.ending_sales) },
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
		<div>CURRENT SALES BREAKDOWN</div>
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
					label: 'Gross Sales',
					value: formatInPeso(report.gross_sales),
				},
			]}
		/>
		<Divider />

		<div>Breakdown of Sales</div>
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

		<div>Deductions</div>
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

		<div>VAT Adjustment</div>
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

		<div>VAT Payable</div>
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
