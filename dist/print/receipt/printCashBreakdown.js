"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashBreakdown = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printCashBreakdown = (cashBreakdown, siteSettings, isPdf = false) => {
    const breakdownCoins = [
        {
            label: '0.25',
            quantity: cashBreakdown.coins_25,
            amount: (0, utils_1.formatInPeso)(0.25 * cashBreakdown.coins_25, ''),
        },
        {
            label: '1.00',
            quantity: cashBreakdown.coins_1,
            amount: (0, utils_1.formatInPeso)(cashBreakdown.coins_1, ''),
        },
        {
            label: '5.00',
            quantity: cashBreakdown.coins_5,
            amount: (0, utils_1.formatInPeso)(5 * cashBreakdown.coins_5, ''),
        },
        {
            label: '10.00',
            quantity: cashBreakdown.coins_10,
            amount: (0, utils_1.formatInPeso)(10 * cashBreakdown.coins_10, ''),
        },
        {
            label: '20.00',
            quantity: cashBreakdown.coins_20,
            amount: (0, utils_1.formatInPeso)(20 * cashBreakdown.coins_20, ''),
        },
    ];
    const denomCoins = breakdownCoins.map(({ label }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${label}</span>
				</div>
				`);
    const quantityCoins = breakdownCoins.map(({ quantity }) => `<div>${quantity}</div>`);
    const amountCoins = breakdownCoins.map(({ amount }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${amount}</span>
				</div>
				`);
    const breakdownBills = [
        {
            label: '20.00',
            quantity: cashBreakdown.bills_20,
            amount: (0, utils_1.formatInPeso)(20 * cashBreakdown.bills_20, ''),
        },
        {
            label: '50.00',
            quantity: cashBreakdown.bills_50,
            amount: (0, utils_1.formatInPeso)(50 * cashBreakdown.bills_50, ''),
        },
        {
            label: '100.00',
            quantity: cashBreakdown.bills_100,
            amount: (0, utils_1.formatInPeso)(100 * cashBreakdown.bills_100, ''),
        },
        {
            label: '200.00',
            quantity: cashBreakdown.bills_200,
            amount: (0, utils_1.formatInPeso)(200 * cashBreakdown.bills_200, ''),
        },
        {
            label: '500.00',
            quantity: cashBreakdown.bills_500,
            amount: (0, utils_1.formatInPeso)(500 * cashBreakdown.bills_500, ''),
        },
        {
            label: '1,000.00',
            quantity: cashBreakdown.bills_1000,
            amount: (0, utils_1.formatInPeso)(1000 * cashBreakdown.bills_1000, ''),
        },
    ];
    const denomBills = breakdownBills.map(({ label }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${label}</span>
				</div>
				`);
    const quantityBills = breakdownBills.map(({ quantity }) => `<div>${quantity}</div>`);
    const amountBills = breakdownBills.map(({ amount }) => `
				<div style="
						display: flex;
						align-items: center;
						justify-content: space-between
					">
					<span>P </span>
					<span>${amount}</span>
				</div>
				`);
    const data = `
	<div style="${(0, helper_receipt_1.getPageStyle)()}">
		<div style="text-align: center; display: flex; flex-direction: column">
      <span style="white-space: pre-line">${siteSettings.store_name}</span>
      <span style="white-space: pre-line">${siteSettings.address_of_tax_payer}</span>
      <span>${cashBreakdown.branch_machine.name}</span>

			<br />

			<span>[CASH BREAKDOWN]</span>
			<span>${(0, utils_1.getCashBreakdownTypeDescription)(cashBreakdown.category, cashBreakdown.type)}</span>
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
			<span>${(0, utils_1.formatInPeso)((0, utils_1.calculateCashBreakdownTotal)(cashBreakdown), helper_receipt_1.PESO_SIGN)}</span>
		</div>

		<br />

    <div>GDT: ${(0, utils_1.formatDateTime)(cashBreakdown.datetime_created)}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
    <div>${cashBreakdown.cashiering_session.user.employee_id}</div>
    ${cashBreakdown.category === globals_1.cashBreakdownCategories.CASH_IN
        ? `<div>Remarks: ${cashBreakdown.remarks}</div>`
        : ''}

		<br />

    ${(0, helper_receipt_1.getFooter)(siteSettings)}
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Cash Breakdown');
};
exports.printCashBreakdown = printCashBreakdown;
