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
import { PrintDetails } from '../../Printing/PrintDetails';

interface Props {
	report: ZReadReport;
	siteSettings: SiteSettings;
	user?: User;
	isForPrint?: boolean;
}

export const ZReadContent = ({
	report,
	siteSettings,
	user,
	isForPrint,
}: Props) => (
	<>
		{report.gross_sales === 0 && !isForPrint && (
			<img
				alt="no transaction"
				className="pointer-events-none absolute left-0 top-0 w-full"
				src={imgNoTransaction}
			/>
		)}

		<ReceiptHeader
			branchMachine={report.branch_machine}
			siteSettings={siteSettings}
		/>

		<br />

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
					label: 'Beg Sales Invoice #:',
					value: report.beginning_or?.or_number || EMPTY_CELL,
				},
				{
					label: 'End Sales Invoice #:',
					value: report.ending_or?.or_number || EMPTY_CELL,
				},
				{
					label: 'Beg Void #:',
					value: report.ending_void_or?.or_number || EMPTY_CELL,
				},
				{
					label: 'End Void #:',
					value: report.ending_void_or?.or_number || EMPTY_CELL,
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
					label: 'Reset Counter No.:',
					value: report.reset_counter,
				},
				{
					label: 'Z Counter No.:',
					value: report.id,
				},
			]}
		/>
		<Divider />

		<ItemBlock
			items={[
				{
					label: '+Current Accum. Sales (end)',
					value: formatInPeso(report.ending_sales, PESO_SIGN),
				},
				{
					label: '-Previous Accum. Sales (beg)',
					value: formatInPeso(report.beginning_sales, PESO_SIGN),
				},
				{
					label: '=Gross Sales of the Day',
					value: formatInPeso(report.current_day_gross_sales, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<ItemBlock
			items={[
				{
					label: '+Gross Sales of the Day',
					value: formatInPeso(report.current_day_gross_sales, PESO_SIGN),
				},
				{
					label: '-Deductions',
					value: formatInPeso(report.current_day_deductions, PESO_SIGN),
				},
				{
					label: '-VAT Amount',
					value: formatInPeso(report.current_day_vat_deductions, PESO_SIGN),
				},
				{
					label: '=Net Amount',
					value: formatInPeso(report.current_day_net_sales, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Current Day Payment Received </div>
		<ItemBlock
			items={[
				{
					label: '+Cash',
					value: formatInPeso(report.cash_payment, PESO_SIGN),
				},
				{
					label: '+Check',
					value: formatInPeso(report.check_payment, PESO_SIGN),
				},
				{
					label: '+Credit Card',
					value: formatInPeso(report.credit_card_payment, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(report.total_payment_received, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Current Day Cash on Hand</div>
		<ItemBlock
			items={[
				{
					label: '+Payment Received',
					value: formatInPeso(report.total_payment_received, PESO_SIGN),
				},
				{
					label: '+Opening fund',
					value: formatInPeso(report.opening_fund, PESO_SIGN),
				},
				{
					label: '+Cash In',
					value: formatInPeso(report.cash_in, PESO_SIGN),
				},
				{
					label: '-Cash Out',
					value: formatInPeso(report.cash_out, PESO_SIGN),
				},
				{
					label: '-Cash Collection',
					value: formatInPeso(report.cash_collection, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(report.total_cash_on_hand, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Current Day Transaction Summary</div>
		<ItemBlock
			items={[
				{
					label: '+Cash on Hand',
					value: formatInPeso(report.total_cash_on_hand, PESO_SIGN),
				},
				{
					label: '-Cash in Drawer',
					value: formatInPeso(report.cash_in_drawer, PESO_SIGN),
				},
				{
					label: '=(Short)/Over',
					value: formatInPeso(report.short_over, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Accumulated Sales Breakdown </div>
		<ItemBlock
			items={[
				{
					label: 'VAT Exempt Sales',
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
					label: 'Zero Rated Sales',
					value: formatInPeso(0, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Accumulated Deductions</div>
		<ItemBlock
			items={[
				{
					label: '+Disc. SC',
					value: formatInPeso(report.sc_discount, PESO_SIGN),
				},
				{
					label: '+Disc. PWD',
					value: formatInPeso(report.pwd_discount, PESO_SIGN),
				},
				{
					label: '+Disc. NAAC',
					value: formatInPeso(report.naac_discount, PESO_SIGN),
				},
				{
					label: '+Disc. Solo Parent',
					value: formatInPeso(report.sp_discount, PESO_SIGN),
				},
				{
					label: '+Disc. Others',
					value: formatInPeso(report.others_discount, PESO_SIGN),
				},
				{
					label: '+Return',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: '+Void',
					value: formatInPeso(report.void, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(report.total_deductions, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Accumulated VAT Adjustment</div>
		<ItemBlock
			items={[
				{
					label: '+Disc. SC',
					value: formatInPeso(report.vat_sc_discount, PESO_SIGN),
				},
				{
					label: '+Disc. PWD',
					value: formatInPeso(report.vat_pwd_discount, PESO_SIGN),
				},
				{
					label: '+Disc. Others',
					value: formatInPeso(report.vat_others_discount, PESO_SIGN),
				},
				{
					label: '+VAT on Returns',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: '+Others',
					value: formatInPeso(report.vat_others, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Accumulated VAT Payable</div>
		<ItemBlock
			items={[
				{
					label: '+VAT Amount (12%)',
					value: formatInPeso(report.vat_amount, PESO_SIGN),
				},
				{
					label: '-VAT Adjustment',
					value: formatInPeso(report.total_vat_adjusted, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(report.vat_payable, PESO_SIGN),
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
		<PrintDetails user={user} />

		<br />

		<ReceiptFooter siteSettings={siteSettings} />

		<div style={{ textAlign: 'center' }}>
			This Document Is Not Valid For Claim Of Input Tax
		</div>
		<div style={{ textAlign: 'center' }}>Thank You!</div>
	</>
);
