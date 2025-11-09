import React from 'react';
import ReactDOMServer from 'react-dom/server';
import dayjs from 'dayjs';
import { formatDateTime, formatInPeso, getFullName } from '../../../utils';
import { ReceiptHeader, ReceiptFooter } from '../../../components/Printing';
import { PESO_SIGN } from '../../helper-receipt';
import { appendHtmlElement, getPageStyleObject } from '../../helper-receipt';
import { PrintCashOut } from './types';

export const printCashOutHtml = ({
	cashOut,
	siteSettings,
	isPdf = false,
}: PrintCashOut) => {
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

	const data = ReactDOMServer.renderToStaticMarkup(
		<div className="container" style={getPageStyleObject()}>
			<ReceiptHeader
				branchMachine={cashOut.branch_machine}
				title="DISBURSEMENT VOUCHER"
			/>

			<br />

			<table style={{ width: '100%', fontSize: '12px' }}>
				<tbody>
					<tr>
						<td style={{ width: '130px' }}>Payee:</td>
						<td>{payee}</td>
					</tr>
					<tr>
						<td>Particulars:</td>
						<td>{particulars}</td>
					</tr>
					<tr>
						<td>Amount:</td>
						<td>{amount}</td>
					</tr>
					<tr>
						<td>Received by:</td>
						<td>{receivedBy}</td>
					</tr>
					<tr>
						<td>Prepared by:</td>
						<td>{preparedBy}</td>
					</tr>
					<tr>
						<td>Approved by:</td>
						<td>{approvedBy}</td>
					</tr>
				</tbody>
			</table>

			<br />

			<div>GDT: {datetime}</div>
			<div>PDT: {formatDateTime(dayjs(), false)}</div>
			<div>{preparedByUser.employee_id}</div>

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
		</div>,
	);

	if (isPdf) {
		return appendHtmlElement(data);
	}

	return data;
};
