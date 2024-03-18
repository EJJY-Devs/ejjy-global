import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReceiptHeader } from '../../components';
import { XAccruedContent } from '../../components/modals/ViewXReadReportModal/XAccruedContent';
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
	Footer,
	ItemBlock,
	PESO_SIGN,
	appendHtmlElement,
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
				<ReceiptHeader
					siteSettings={siteSettings}
					branchMachine={report.branch_machine}
				/>

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

				<Footer siteSettings={siteSettings} />
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
							value: formatInPeso(report.beginning_sales, PESO_SIGN),
						},
					]}
				/>
			</div>

			<Divider />

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
				]}
			/>
			<Divider />

			<div style={{ textAlign: 'center' }}>Payment Received</div>
			<ItemBlock
				items={[
					{
						label: 'Cash',
						value: formatInPeso(0, PESO_SIGN),
					},
					{
						label: 'Check',
						value: formatInPeso(0, PESO_SIGN),
					},
					{
						label: 'Credit Card',
						value: formatInPeso(0, PESO_SIGN),
					},
					{
						label: 'Total Payments',
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
						label: 'Withdrawals',
						value: formatInPeso(0, PESO_SIGN),
					},
				]}
			/>
			<Divider />

			<div style={{ textAlign: 'center' }}>Transaction Summary</div>
			<ItemBlock
				items={[
					{
						label: 'Cash in Drawer',
						value: formatInPeso(0, PESO_SIGN),
					},
					{
						label: 'Check',
						value: formatInPeso(0, PESO_SIGN),
					},
					{
						label: 'Credit Card',
						value: formatInPeso(0, PESO_SIGN),
					},
					{
						label: 'Opening fund',
						value: formatInPeso(0, PESO_SIGN),
					},
					{
						label: 'Withdrawal',
						value: formatInPeso(0, PESO_SIGN),
						isIndented: true,
						isParenthesized: true,
					},
					{
						label: 'Payment Received',
						value: formatInPeso(0, PESO_SIGN),
						isIndented: true,
						isParenthesized: true,
					},
					{
						label: 'Short / Over',
						value: formatInPeso(0, PESO_SIGN),
					},
				]}
			/>
		</>
	);
};
