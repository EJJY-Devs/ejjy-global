import React from 'react';
import { EMPTY_CELL } from '../../../globals';
import { PESO_SIGN } from '../../../print/helper-receipt';
import { DailySales, SiteSettings, User } from '../../../types';
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
	dailySales: DailySales;
	siteSettings: SiteSettings;
	user?: User;
}

export const DailySalesContent = ({
	dailySales,
	siteSettings,
	user,
}: Props) => (
	<>
		<ReceiptHeader
			branchMachine={dailySales.branch_machine}
			siteSettings={siteSettings}
		/>

		<br />

		<div style={{ fontWeight: 'bold', textAlign: 'center' }}>
			DAILY SALES REPORT
		</div>

		<br />

		<div style={{ textAlign: 'center' }}>Report Generation Datetime</div>
		{dailySales.generation_datetime && (
			<div style={{ textAlign: 'center' }}>
				{formatDate(dailySales.generation_datetime)} -{' '}
				{formatTime(dailySales.generation_datetime)}
			</div>
		)}
		<div style={{ textAlign: 'center' }}>Day Datetime</div>
		<div style={{ textAlign: 'center' }}>
			{formatDate(dailySales.datetime_created)} |{' '}
			{[
				dailySales.daily_sales_data.branch_day_open_datetime
					? formatTime(dailySales.daily_sales_data.branch_day_open_datetime)
					: null,
				dailySales.generation_datetime
					? formatTime(dailySales.generation_datetime)
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
					value: dailySales.beginning_or?.or_number || EMPTY_CELL,
				},
				{
					label: 'End Sales Invoice #:',
					value: dailySales.ending_or?.or_number || EMPTY_CELL,
				},
			]}
		/>

		<Divider />

		<ItemBlock
			items={[
				{
					label: '+Current Accum. Sales (end)',
					value: formatInPeso(dailySales.ending_sales, PESO_SIGN),
				},
				{
					label: '-Previous Accum. Sales (beg)',
					value: formatInPeso(dailySales.beginning_sales, PESO_SIGN),
				},
				{
					label: '=Gross Sales of the Day',
					value: formatInPeso(dailySales.gross_sales, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Sales Breakdown</div>
		<ItemBlock
			items={[
				{
					label: 'VAT Exempt Sales',
					value: formatInPeso(dailySales.vat_exempt, PESO_SIGN),
				},
				{
					label: 'VATable Sales',
					value: formatInPeso(dailySales.vat_sales, PESO_SIGN),
				},
				{
					label: 'VAT Amount (12%)',
					value: formatInPeso(dailySales.vat_amount, PESO_SIGN),
				},
				{
					label: 'Zero Rated Sales',
					value: formatInPeso(0, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Deductions</div>
		<ItemBlock
			items={[
				{
					label: '+Disc. SC',
					value: formatInPeso(dailySales.sc_discount, PESO_SIGN),
				},
				{
					label: '+Disc. PWD',
					value: formatInPeso(dailySales.pwd_discount, PESO_SIGN),
				},
				{
					label: '+Disc. NAAC',
					value: formatInPeso(dailySales.naac_discount, PESO_SIGN),
				},
				{
					label: '+Disc. Solo Parent',
					value: formatInPeso(dailySales.sp_discount, PESO_SIGN),
				},
				{
					label: '+Disc. Others',
					value: formatInPeso(dailySales.others_discount, PESO_SIGN),
				},
				{
					label: '+Return',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: '+Void',
					value: formatInPeso(dailySales.void, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(dailySales.total_deductions, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>VAT Adjustment</div>
		<ItemBlock
			items={[
				{
					label: '+Disc. SC',
					value: formatInPeso(dailySales.vat_sc_discount, PESO_SIGN),
				},
				{
					label: '+Disc. PWD',
					value: formatInPeso(dailySales.vat_pwd_discount, PESO_SIGN),
				},
				{
					label: '+Disc. Others',
					value: formatInPeso(dailySales.vat_others_discount, PESO_SIGN),
				},
				{
					label: '+VAT on Returns',
					value: formatInPeso(0, PESO_SIGN),
				},
				{
					label: '+Others',
					value: formatInPeso(dailySales.vat_others, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>VAT Payable</div>
		<ItemBlock
			items={[
				{
					label: '+VAT Amount (12%)',
					value: formatInPeso(dailySales.vat_amount, PESO_SIGN),
				},
				{
					label: '-VAT Adjustment',
					value: formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(dailySales.vat_payable, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<ItemBlock
			items={[
				{
					label: '+Gross Sales of the Day',
					value: formatInPeso(dailySales.gross_sales, PESO_SIGN),
				},
				{
					label: '-Deductions',
					value: formatInPeso(dailySales.total_deductions, PESO_SIGN),
				},
				{
					label: '-VAT Amount',
					value: formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN),
				},
				{
					label: '=Net Amount',
					value: formatInPeso(dailySales.net_sales, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Payment Received </div>
		<ItemBlock
			items={[
				{
					label: '+Cash',
					value: formatInPeso(dailySales.cash_payment, PESO_SIGN),
				},
				{
					label: '+Check',
					value: formatInPeso(dailySales.check_payment, PESO_SIGN),
				},
				{
					label: '+Credit Card',
					value: formatInPeso(dailySales.credit_card_payment, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(dailySales.total_payment_received, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Cash on Hand</div>
		<ItemBlock
			items={[
				{
					label: '+Payment Received',
					value: formatInPeso(dailySales.total_payment_received, PESO_SIGN),
				},
				{
					label: '+Opening fund',
					value: formatInPeso(dailySales.opening_fund, PESO_SIGN),
				},
				{
					label: '+Cash In',
					value: formatInPeso(dailySales.cash_in, PESO_SIGN),
				},
				{
					label: '-Cash Out',
					value: formatInPeso(dailySales.cash_out, PESO_SIGN),
				},
				{
					label: '-Cash Collection',
					value: formatInPeso(dailySales.cash_collection, PESO_SIGN),
				},
				{
					label: '=Total',
					value: formatInPeso(dailySales.total_cash_on_hand, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div style={{ textAlign: 'center' }}>Transaction Summary</div>
		<ItemBlock
			items={[
				{
					label: '+Cash in Drawer',
					value: formatInPeso(dailySales.cash_in_drawer, PESO_SIGN),
				},
				{
					label: '-Cash on Hand',
					value: formatInPeso(dailySales.total_cash_on_hand, PESO_SIGN),
				},
				{
					label: '=(Short)/Over',
					value: formatInPeso(dailySales.short_over, PESO_SIGN),
				},
			]}
		/>
		<Divider />

		<div>
			GDT:{' '}
			{dailySales.generation_datetime
				? formatDateTime(dailySales.generation_datetime)
				: EMPTY_CELL}
		</div>
		<PrintDetails user={user} />

		<br />

		<ReceiptFooter siteSettings={siteSettings} />
	</>
);
