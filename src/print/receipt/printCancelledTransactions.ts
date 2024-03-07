import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../globals';
import { SiteSettings, Transaction, User } from '../../types';
import {
	formatDateTime,
	formatInPeso,
	getTransactionStatusDescription,
} from '../../utils';
import {
	EMPTY_CELL,
	PESO_SIGN,
	getFooter,
	getHeader,
	getPageStyle,
	print,
} from '../helper-receipt';

export const printCancelledTransactions = (
	amount: number,
	filterRange: string,
	filterStatus: string,
	siteSettings: SiteSettings,
	transactions: Transaction[],
	user: User,
	onComplete: () => void,
) => {
	const branchMachine = transactions?.[0]?.branch_machine;

	const data = `
	<div style="${getPageStyle()}">
		<style>
			td {
				padding-top: 0;
				padding-bottom: 0;
				line-height: 100%;
			}
		</style>

		${getHeader(siteSettings, branchMachine)}

		<br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Status:</span>
			<span style="text-align: right;">${getTransactionStatusDescription(
				filterStatus,
			)}</span>
		</div>
		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Date Range:</span>
			<span style="text-align: right;">AS OF ${dayjs().format(DATE_FORMAT)}</span>
		</div>
		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Date of Printing:</span>
			<span style="text-align: right;">${filterRange}</span>
		</div>

		<br />

		<table style="width: 100%;">
			${transactions
				.map(
					(transaction) =>
						`
					<tr>
						<td>${transaction?.invoice?.or_number || EMPTY_CELL}</td>
						<td style="text-align: right">
							${formatInPeso(transaction.total_amount, PESO_SIGN)}
						</td>
					</tr>`,
				)
				.join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>TOTAL</span>
			<span>${formatInPeso(amount, PESO_SIGN)}</span>
		</div>

		<br />

    <div>PDT: ${formatDateTime(dayjs(), false)}</div>
    <div>${user.employee_id}</div>

    <br />

    ${getFooter(siteSettings)}

	</div>
	`;

	print(data, 'Transactions', onComplete);
};
