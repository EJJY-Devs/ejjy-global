import dayjs from 'dayjs';
import { cashBreakdownCategories } from '../../globals';
import { BranchMachine, CashBreakdown, SiteSettings } from '../../types';
import {
	calculateCashBreakdownTotal,
	formatDateTime,
	formatInPeso,
	getCashBreakdownTypeDescription,
} from '../../utils';
import { PESO_SIGN, getFooter, getPageStyle, print } from '../helper-receipt';

export const printCashBreakdown = (
	cashBreakdown: CashBreakdown,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
) => {
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
	const denomCoins = breakdownCoins.map(
		({ label }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${label}</span>
				</div>
				`,
	);
	const quantityCoins = breakdownCoins.map(
		({ quantity }) => `<div>${quantity}</div>`,
	);
	const amountCoins = breakdownCoins.map(
		({ amount }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${amount}</span>
				</div>
				`,
	);
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
	const denomBills = breakdownBills.map(
		({ label }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${label}</span>
				</div>
				`,
	);
	const quantityBills = breakdownBills.map(
		({ quantity }) => `<div>${quantity}</div>`,
	);
	const amountBills = breakdownBills.map(
		({ amount }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${amount}</span>
				</div>
				`,
	);

	const data = `
	<div style="${getPageStyle()}">
		<div style="text-align: center; display: flex; flex-direction: column">
      <span style="white-space: pre-line">${siteSettings.store_name}</span>
      <span style="white-space: pre-line">${
				siteSettings.address_of_tax_payer
			}</span>
      <span>${branchMachine?.name}</span>

			<br />

			<span>[CASH BREAKDOWN]</span>
			<span>${getCashBreakdownTypeDescription(
				cashBreakdown.category,
				cashBreakdown.type,
			)}</span>
		</div>

		<br />

		<div style="display: flex">
			<div>
				<div style="text-align: center">DENOM</div>
				<br/>
				<div>COINS</div>
				${denomCoins.join('')}
				<br/>
				<div>BILLS</div>
				${denomBills.join('')}
			</div>
			<div style="flex: 1; padding-left: 10px; display: flex; flex-direction: column; align-items: center">
				<div>QTY</div>
				<br/>
				<br/>
				${quantityCoins.join('')}
				<br/>
				<br/>
				${quantityBills.join('')}
			</div>
			<div>
				<div style="text-align: center">AMOUNT</div>
				<br/>
				<br/>
				${amountCoins.join('')}
				<br/>
				<br/>
				${amountBills.join('')}
			</div>
		</div>


		<div style="display: flex; align-items: center; justify-content: space-evenly">
			<span>TOTAL</span>
			<span>${formatInPeso(
				calculateCashBreakdownTotal(cashBreakdown),
				PESO_SIGN,
			)}</span>
		</div>

		<br />

    <div>GDT: ${formatDateTime(cashBreakdown.datetime_created)}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>
    <div>${cashBreakdown.cashiering_session.user.employee_id}</div>
    ${
			cashBreakdown.category === cashBreakdownCategories.CASH_IN
				? `<div>Remarks: ${cashBreakdown.remarks}</div>`
				: ''
		}

		<br />

    ${getFooter(siteSettings)}
	</div>
	`;

	print(data, 'Cash Breakdown');
};
