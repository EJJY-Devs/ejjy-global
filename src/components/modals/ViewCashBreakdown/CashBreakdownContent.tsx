import React from 'react';
import { cashBreakdownCategories } from '../../../globals';
import { PESO_SIGN } from '../../../print/helper-receipt';
import { CashBreakdown, SiteSettings, User } from '../../../types';
import {
	formatDateTime,
	formatInPeso,
	getCashBreakdownTypeDescription,
} from '../../../utils';
import { ReceiptFooter, ReceiptHeader } from '../../Printing';
import { PrintDetails } from '../../Printing/PrintDetails';

type Props = {
	cashBreakdown: CashBreakdown;
	siteSettings: SiteSettings;
	user?: User;
};

export const CashBreakdownContent = ({
	cashBreakdown,
	siteSettings,
	user,
}: Props) => {
	<ReceiptHeader branchMachine={cashBreakdown.branch_machine} />;
	const breakdownCoins = [
		{
			label: '0.25',
			quantity: cashBreakdown.coins_25,
			amount: formatInPeso(0.25 * cashBreakdown.coins_25, ''),
		},
		{
			label: '1.00',
			quantity: cashBreakdown.coins_1,
			amount: formatInPeso(cashBreakdown.coins_1, ''),
		},
		{
			label: '5.00',
			quantity: cashBreakdown.coins_5,
			amount: formatInPeso(5 * cashBreakdown.coins_5, ''),
		},
		{
			label: '10.00',
			quantity: cashBreakdown.coins_10,
			amount: formatInPeso(10 * cashBreakdown.coins_10, ''),
		},
		{
			label: '20.00',
			quantity: cashBreakdown.coins_20,
			amount: formatInPeso(20 * cashBreakdown.coins_20, ''),
		},
	];

	const denomCoins = breakdownCoins.map(({ label }) => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<span>P </span>
			<span>{label}</span>
		</div>
	));
	const quantityCoins = breakdownCoins.map(({ quantity }) => (
		<div>{quantity}</div>
	));
	const amountCoins = breakdownCoins.map(({ amount }) => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<span>P </span>
			<span>{amount}</span>
		</div>
	));
	const breakdownBills = [
		{
			label: '20.00',
			quantity: cashBreakdown.bills_20,
			amount: formatInPeso(20 * cashBreakdown.bills_20, ''),
		},
		{
			label: '50.00',
			quantity: cashBreakdown.bills_50,
			amount: formatInPeso(50 * cashBreakdown.bills_50, ''),
		},
		{
			label: '100.00',
			quantity: cashBreakdown.bills_100,
			amount: formatInPeso(100 * cashBreakdown.bills_100, ''),
		},
		{
			label: '200.00',
			quantity: cashBreakdown.bills_200,
			amount: formatInPeso(200 * cashBreakdown.bills_200, ''),
		},
		{
			label: '500.00',
			quantity: cashBreakdown.bills_500,
			amount: formatInPeso(500 * cashBreakdown.bills_500, ''),
		},
		{
			label: '1,000.00',
			quantity: cashBreakdown.bills_1000,
			amount: formatInPeso(1000 * cashBreakdown.bills_1000, ''),
		},
	];
	const denomBills = breakdownBills.map(({ label }) => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<span>P </span>
			<span>{label}</span>
		</div>
	));
	const quantityBills = breakdownBills.map(({ quantity }) => (
		<div>{quantity}</div>
	));
	const amountBills = breakdownBills.map(({ amount }) => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<span>P </span>
			<span>{amount}</span>
		</div>
	));

	return (
		<>
			<div
				style={{
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<span style={{ whiteSpace: 'pre-line' }}>
					{siteSettings.store_name}
				</span>
				<span style={{ whiteSpace: 'pre-line' }}>
					{siteSettings.address_of_tax_payer}
				</span>
				<span>{cashBreakdown.branch_machine.name}</span>

				<br />

				<span>[CASH BREAKDOWN]</span>
				<span>
					{getCashBreakdownTypeDescription(
						cashBreakdown.category,
						cashBreakdown.type,
					)}
				</span>
			</div>
			<br />
			<div style={{ display: 'flex' }}>
				<div>
					<div style={{ textAlign: 'center' }}>DENOM</div>
					<br />
					<div>COINS</div>
					{denomCoins}
					<br />
					<div>BILLS</div>
					{denomBills}
				</div>

				<div
					style={{
						flex: 1,
						paddingLeft: 10,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<div>QTY</div>
					<br />
					<br />
					{quantityCoins}
					<br />
					<br />
					{quantityBills}
				</div>
				<div>
					<div style={{ textAlign: 'center' }}>AMOUNT</div>
					<br />
					<br />
					{amountCoins}
					<br />
					<br />
					{amountBills}
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-evenly',
				}}
			>
				<span>TOTAL</span>
				<span>{formatInPeso(cashBreakdown.total_amount, PESO_SIGN)}</span>
			</div>

			<br />

			<div>GDT: {formatDateTime(cashBreakdown.datetime_created)}</div>
			<PrintDetails user={user} />
			{cashBreakdown.category === cashBreakdownCategories.CASH_IN ||
				(cashBreakdown.category === cashBreakdownCategories.PRINT_ONLY && (
					<div>Remarks: {cashBreakdown.remarks}</div>
				))}

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
		</>
	);
};
