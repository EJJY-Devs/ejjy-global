import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SiteSettings, User, XReadReport, ZReadReport } from '../../types';
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
	Header,
	ItemBlock,
	PESO_SIGN,
	ReceiptReportSummary,
	appendHtmlElement,
	getFooter,
	getHeader,
	getPageStyleObject,
	print,
} from '../helper-receipt';

export const printZReadReport = (
	report: ZReadReport,
	siteSettings: SiteSettings,
	user: User,
	isPdf = false,
) => {
	const data = ReactDOMServer.renderToStaticMarkup(
		<>
			<div className="container" style={getPageStyleObject()}>
				<Header
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
						<ZAccruedContent report={report} />
					) : (
						<ZReadContent report={report} />
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
					<div>C: {report?.generated_by?.employee_id || EMPTY_CELL}</div>
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
	report: ZReadReport;
};

const ZReadContent = ({ report }: Props) => (
	<>
		<div style={{ fontWeight: 'bold', textAlign: 'center' }}>
			Z-READING REPORT
		</div>

		<br />

		<div style={{ textAlign: 'center' }}>Report Generation Datetime</div>
		{report.generation_datetime && (
			<div style={{ textAlign: 'center' }}>
				{formatDate(report.generation_datetime)} -{' '}
				{formatTime(report.generation_datetime)}
			</div>
		)}
		<div style={{ textAlign: 'center' }}>Day Datetime</div>
		<div style={{ textAlign: 'center' }}>
			{formatDate(report.datetime_created)} |{' '}
			{[
				formatTime(report.datetime_created),
				report.generation_datetime
					? formatTime(report.generation_datetime)
					: null,
			]
				.filter(Boolean)
				.join(' - ')}
		</div>

		<br />

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

		<br />

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
		<Divider />

		<ItemBlock
			items={[
				{
					label: 'Present Accum. Sales',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Previous Accum. Sales',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Sales for the Day',
					value: formatInPeso(0, PESO_SIGN),
				},
			]}
		/>

		<br />
		<ItemBlock
			items={[
				{
					label: 'Cash Sales',
					value: formatInPeso(report.cash_sales, PESO_SIGN),
					isIndented: true,
				},
				{
					label: 'Credit Sales',
					value: formatInPeso(report.credit_pay, PESO_SIGN),
					isUnderlined: true,
					isIndented: true,
				},
			]}
		/>

		<Divider />

		<div>Breakdown of Sales</div>
		<ItemBlock
			items={[
				{
					label: 'VATable Sales',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'VAT Amount',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'VAT Exempt Sales',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: 'Zero Rated Sales',
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

		<div>Deductions</div>
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

		<div>VAT Adjustment</div>
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

		<div>VAT Payable</div>
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
		<Divider />

		<div>Transaction Summary</div>
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

const ZAccruedContent = ({ report }: Props) => (
	<>
		<div style={{ fontWeight: 'bold' }}>Current Day Accumulated Report</div>
		<div style={{ fontWeight: 'bold' }}>Z-READ (closing day report)</div>

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
				{ label: 'Cur', value: formatInPeso(report.current_sales, PESO_SIGN) },
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

		<br />

		<div>ACCUMULATED SALES BREAKDOWN</div>
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
					label: 'Sales for the Day',
					value: formatInPeso(report.gross_sales, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div>Breakdown of Sales</div>
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

		<div>Deductions</div>
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

		<div>VAT Adjustment</div>
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

		<div>VAT Payable</div>
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
