import React from 'react';
import dayjs from 'dayjs';
import { formatDateTime, formatInPeso } from '../../../utils';
import { ReceiptHeader, ReceiptFooter } from '../../../components/Printing';
import { PESO_SIGN } from '../../helper-receipt';
import { CashCollectionMetadata } from '../../../types';
import { CASH_COLLECTION_VOUCHER_TITLE } from './constants';
import { PrintCashCollection } from './types';

export const CashCollectionVoucherContent = ({
	cashBreakdown,
	siteSettings,
	user,
}: Omit<PrintCashCollection, 'isPdf'>) => {
	const metadata =
		cashBreakdown.cash_collection_metadata as CashCollectionMetadata;

	const { collector } = metadata;
	const datetime = formatDateTime(cashBreakdown.datetime_created);
	const amount = formatInPeso(metadata.amount, PESO_SIGN);

	return (
		<>
			<ReceiptHeader
				branchMachine={cashBreakdown.branch_machine}
				title={CASH_COLLECTION_VOUCHER_TITLE}
			/>

			<br />

			<table style={{ width: '100%', fontSize: '12px' }}>
				<tbody>
					<tr>
						<td style={{ width: '130px' }}>Collector:</td>
						<td>{collector}</td>
					</tr>
					<tr>
						<td>Amount:</td>
						<td>{amount}</td>
					</tr>
					<tr>
						<td>Remarks:</td>
						<td>{cashBreakdown.remarks}</td>
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
