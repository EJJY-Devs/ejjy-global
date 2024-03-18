import React from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { EMPTY_CELL } from '../../../globals';
import { PESO_SIGN } from '../../../print/helper-receipt';
import { SiteSettings, User, ZReadReport } from '../../../types';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	formatTime,
} from '../../../utils';
import { Divider, ReceiptFooter, ReceiptHeader } from '../../Printing';
import { ItemBlock } from '../../Printing/ItemBlock';

interface Props {
	report: ZReadReport;
	siteSettings: SiteSettings;
	user: User;
	isForPrint?: boolean;
}

export const ZReadContent = ({
	report,
	siteSettings,
	user,
	isForPrint,
}: Props) => {
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

			<div style={{ fontWeight: 'bold', textAlign: 'center' }}>
				{isAccrued ? 'Z-ACCRUED REPORT' : 'Z-READING REPORT'}
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
						label: 'Beg Sales Invoice #:',
						value: report.beginning_or?.or_number || EMPTY_CELL,
					},
					{
						label: 'End Sales Invoice #:',
						value: report.ending_or?.or_number || EMPTY_CELL,
					},
					{
						label: 'Beg Void #:',
						value: EMPTY_CELL,
					},
					{
						label: 'End Void #:',
						value: EMPTY_CELL,
					},
					{
						label: 'Beg Return #:',
						value: EMPTY_CELL,
					},
					{
						label: 'End Return #:',
						value: EMPTY_CELL,
					},
				]}
			/>

			<br />

			<ItemBlock
				items={[
					{
						label: 'Transaction Count:',
						value: report.total_transactions,
					},
					{
						label: 'Reset Counter No.:',
						value: 0,
					},
					{
						label: 'Z Counter No.:',
						value: 0,
					},
					{
						label: 'Opening Fund/Cash In:',
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
			<Divider />

			<div style={{ textAlign: 'center' }}>Sales Breakdown</div>
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
						label: '+Gross Amount',
						value: formatInPeso(report.gross_sales, PESO_SIGN),
					},
					{
						label: '-Deductions',
						value: formatInPeso(0, PESO_SIGN),
					},
					{
						label: '-VAT Adjustment (12%)',
						value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
					},
					{
						label: '=Net Amount',
						value: formatInPeso(report.net_sales, PESO_SIGN),
					},
				]}
			/>
			<Divider />

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

			{isAccrued && (
				<>
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
				</>
			)}

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
					{user?.employee_id || report?.generated_by?.employee_id || EMPTY_CELL}
				</div>
			</div>

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
		</>
	);
};
