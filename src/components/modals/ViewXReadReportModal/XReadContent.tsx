import React from 'react';
import imgNoTransaction from '../../../../public/no-transaction.png';
import { EMPTY_CELL } from '../../../globals';
import { PESO_SIGN } from '../../../print/helper-receipt';
import { SiteSettings, User, XReadReport } from '../../../types';
import {
	formatDate,
	formatInPeso,
	formatTime,
	getFullName,
} from '../../../utils';
import { Divider, ReceiptFooter, ReceiptHeader } from '../../Printing';
import { ItemBlock } from '../../Printing/ItemBlock';
import { PrintDetails } from '../../Printing/PrintDetails';

type Props = {
	report: XReadReport;
	siteSettings: SiteSettings;
	user?: User;
	isForPrint?: boolean;
};

export const XReadContent = ({
	report,
	siteSettings,
	user,
	isForPrint,
}: Props) => {
	const cashieringSession = report.cashiering_session;

	return (
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
				X-READING REPORT
			</div>

			<br />

			{report.generation_datetime && (
				<>
					<div style={{ textAlign: 'center' }}>Report Generation Datetime</div>
					<div style={{ textAlign: 'center' }}>
						{[
							formatDate(report.generation_datetime),
							formatTime(report.generation_datetime),
						].join(' - ')}
					</div>
				</>
			)}

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
						label: 'Opening Fund:',
						value: formatInPeso(report.opening_fund, PESO_SIGN),
					},
				]}
			/>
			<Divider />

			<div style={{ textAlign: 'center' }}>Payment Received</div>
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

			<div style={{ textAlign: 'center' }}>Cash on Hand</div>
			<ItemBlock
				items={[
					{
						label: '+Payment Received',
						value: formatInPeso(report.total_payment_received, PESO_SIGN),
					},
					{
						label: '+Opening Fund',
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

			<div style={{ textAlign: 'center' }}>Transaction Summary</div>
			<ItemBlock
				items={[
					{
						label: '+Cash in Drawer',
						value: formatInPeso(report.cash_in_drawer, PESO_SIGN),
					},
					{
						label: '-Cash on Hand',
						value: formatInPeso(report.total_cash_on_hand, PESO_SIGN),
					},
					{
						label: '=(Short)/Over',
						value: [
							report.short_over < 0 ? '(' : '',
							formatInPeso(Math.abs(report.short_over), PESO_SIGN),
							report.short_over < 0 ? ')' : '',
						].join(''),
					},
				]}
			/>

			<Divider />

			<PrintDetails user={user} />

			<br />

			<ReceiptFooter siteSettings={siteSettings} />

			<div style={{ textAlign: 'center' }}>
				This Document Is Not Valid For Claim Of Input Tax
			</div>
			<div style={{ textAlign: 'center' }}>Thank You!</div>
		</>
	);
};
