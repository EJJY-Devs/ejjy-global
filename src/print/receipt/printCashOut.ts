import dayjs from 'dayjs';
import { CashBreakdown, SiteSettings } from '../../types';
import { formatDateTime, formatInPeso, getFullName } from '../../utils';
import {
	PESO_SIGN,
	appendHtmlElement,
	getFooter,
	getHeader,
	getPageStyle,
	print,
} from '../helper-receipt';

export const printCashOut = (
	cashOut: CashBreakdown,
	siteSettings: SiteSettings,
	isPdf = false,
) => {
	const metadata = cashOut.cash_out_metadata;

	const {
		payee,
		particulars,
		received_by: receivedBy,
		prepared_by_user: preparedByUser,
	} = metadata;
	const datetime = formatDateTime(cashOut.datetime_created);
	const amount = formatInPeso(metadata.amount, PESO_SIGN);
	const preparedBy = getFullName(metadata.prepared_by_user);
	const approvedBy = getFullName(metadata.approved_by_user);
	const branchMachine = cashOut.branch_machine;

	const data = `
	<div style="${getPageStyle()}">
    ${getHeader(siteSettings, branchMachine, 'DISBURSEMENT VOUCHER')}

		<br />

		<table style="width: 100%;">
			<thead>
				<tr>
					<th style="width: 130px"></th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>Payee:</td>
					<td>${payee}</td>
				</tr>
        <tr>
					<td>Particulars:</td>
					<td>${particulars}</td>
				</tr>
				<tr>
					<td>Amount:</td>
					<td>${amount}</td>
				</tr>
        <tr>
					<td>Received by:</td>
					<td>${receivedBy}</td>
				</tr>
				<tr>
					<td>Prepared by:</td>
					<td>${preparedBy}</td>
				</tr>
				<tr>
					<td>Approved by:</td>
					<td>${approvedBy}</td>
				</tr>
			</tbody>
		</table>

		<br />

    <div>GDT: ${datetime}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>
    <div>${preparedByUser.employee_id}</div>

    <br />

    ${getFooter(siteSettings)}
	</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Cash Out');
};
