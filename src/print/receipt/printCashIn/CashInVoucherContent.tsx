import React from 'react';
import dayjs from 'dayjs';
import { formatDateTime, formatInPeso } from '../../../utils';
import { ReceiptHeader, ReceiptFooter } from '../../../components/Printing';
import { PESO_SIGN } from '../../helper-receipt';
import { CashInMetadata } from '../../../types';
import { CASH_IN_VOUCHER_TITLE } from './constants';
import { PrintCashIn } from './types';

export const CashInVoucherContent = ({
	cashBreakdown,
	siteSettings,
	user,
}: Omit<PrintCashIn, 'isPdf'>) => {
	const metadata = cashBreakdown.cash_in_metadata as CashInMetadata;

	const { received_from: receivedFrom, particulars } = metadata;
	const datetime = formatDateTime(cashBreakdown.datetime_created);
	const amount = formatInPeso(metadata.amount, PESO_SIGN);

	return (
		<>
			<ReceiptHeader
				branchMachine={cashBreakdown.branch_machine}
				title={CASH_IN_VOUCHER_TITLE}
			/>

			<br />

			<table style={{ width: '100%', fontSize: '12px' }}>
				<tbody>
					<tr>
						<td style={{ width: '130px' }}>Received From:</td>
						<td>{receivedFrom}</td>
					</tr>
					<tr>
						<td>Particulars:</td>
						<td>{particulars}</td>
					</tr>
					<tr>
						<td>Amount:</td>
						<td>{amount}</td>
					</tr>
				</tbody>
			</table>

			<br />

			<div>GDT: {datetime}</div>
			<div>PDT: {formatDateTime(dayjs(), false)}</div>
			<div>{user?.employee_id}</div>

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
		</>
	);
};
