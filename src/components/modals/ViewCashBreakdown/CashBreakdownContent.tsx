import React from 'react';
import { cashBreakdownCategories, cashBreakdownTypes } from '../../../globals';
import { CashInVoucherContent } from '../../../print/receipt/printCashIn/CashInVoucherContent';
import { CashInDrawerSummary } from '../../../print/receipt/printCashBreakdown/types';
import { CashCollectionVoucherContent } from '../../../print/receipt/printCashCollection/CashCollectionVoucherContent';
import { CashBreakdown, SiteSettings, User } from '../../../types';
import {
	CASH_BREAKDOWN_BILLS,
	CASH_BREAKDOWN_COINS,
	formatDateTime,
	formatInPeso,
	getCashBreakdownTotals,
	getCashInDrawerTotals,
	getCashBreakdownTypeDescription,
} from '../../../utils';
import { ReceiptFooter, ReceiptHeader } from '../../Printing';
import { PrintDetails } from '../../Printing/PrintDetails';

const PESO_SIGN_UI = '₱';

type Props = {
	cashBreakdown: CashBreakdown;
	siteSettings: SiteSettings;
	user?: User;
	// 'columns' (Coins | Bills side by side) for the modal, 'stacked' for
	// narrow receipt output
	layout?: 'columns' | 'stacked';
	// Cash in Drawer only: adds e-payments, others and total remittance lines
	cashInDrawerSummary?: CashInDrawerSummary;
};

export const CashBreakdownContent = ({
	cashBreakdown,
	siteSettings,
	user,
	layout = 'columns',
	cashInDrawerSummary,
}: Props) => {
	// Cash In and Cash Collection are voucher-style receipts, not denomination
	// (coins/bills) breakdowns — Opening Fund (start_session) and Cash in
	// Drawer (end_session) keep the denomination table below untouched.
	if (
		cashBreakdown.category === cashBreakdownCategories.CASH_IN &&
		cashBreakdown.type === cashBreakdownTypes.MID_SESSION
	) {
		return (
			<CashInVoucherContent
				cashBreakdown={cashBreakdown}
				siteSettings={siteSettings}
				user={user}
			/>
		);
	}

	if (
		cashBreakdown.category === cashBreakdownCategories.CASH_BREAKDOWN &&
		cashBreakdown.type === cashBreakdownTypes.MID_SESSION
	) {
		return (
			<CashCollectionVoucherContent
				cashBreakdown={cashBreakdown}
				siteSettings={siteSettings}
				user={user}
			/>
		);
	}

	const { coinsTotal, billsTotal, total } =
		getCashBreakdownTotals(cashBreakdown);
	const drawerTotals = getCashInDrawerTotals(
		cashBreakdown,
		total,
		cashInDrawerSummary,
	);

	const denominationSection = (
		title: string,
		denominations: typeof CASH_BREAKDOWN_COINS,
		subtotal: number,
	) => (
		<div style={{ flex: 1 }}>
			<div style={{ textAlign: 'center', fontWeight: 'bold' }}>{title}</div>
			{denominations.map(({ key, value }) => (
				<div
					key={key}
					style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}
				>
					<span>{formatInPeso(value, '')}</span>
					<span>x {cashBreakdown[key]}</span>
					<span>{formatInPeso(value * cashBreakdown[key], '')}</span>
				</div>
			))}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '1px dashed',
				}}
			>
				<span>Subtotal</span>
				<span>{formatInPeso(subtotal, PESO_SIGN_UI)}</span>
			</div>
		</div>
	);

	return (
		<>
			<div
				style={{
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<ReceiptHeader branchMachine={cashBreakdown.branch_machine} />

				<br />

				<span>
					{getCashBreakdownTypeDescription(
						cashBreakdown.category,
						cashBreakdown.type,
					)}
				</span>
			</div>
			<br />
			<div
				style={{
					display: 'flex',
					flexDirection: layout === 'columns' ? 'row' : 'column',
					gap: 16,
				}}
			>
				{denominationSection('COINS', CASH_BREAKDOWN_COINS, coinsTotal)}
				{denominationSection('BILLS', CASH_BREAKDOWN_BILLS, billsTotal)}
			</div>

			{drawerTotals ? (
				<div style={{ fontWeight: 'bold' }}>
					{[
						['TOTAL CASH ON HAND', total],
						['TOTAL E-PAYMENTS', drawerTotals.ePayments],
						...(drawerTotals.others !== undefined
							? [['OTHERS', drawerTotals.others]]
							: []),
						['TOTAL REMITTANCE', drawerTotals.remittance],
					].map(([label, value]) => (
						<div
							key={label}
							style={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<span>{label}</span>
							<span>{formatInPeso(Number(value), PESO_SIGN_UI)}</span>
						</div>
					))}
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-evenly',
						fontWeight: 'bold',
					}}
				>
					<span>TOTAL</span>
					<span>{formatInPeso(total, PESO_SIGN_UI)}</span>
				</div>
			)}

			<br />

			<div>GDT: {formatDateTime(cashBreakdown.datetime_created)}</div>
			<PrintDetails user={user} />
			{(cashBreakdown.category === cashBreakdownCategories.CASH_IN ||
				cashBreakdown.category === cashBreakdownCategories.PRINT_ONLY) && (
				<div>Remarks: {cashBreakdown.remarks}</div>
			)}

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
		</>
	);
};
