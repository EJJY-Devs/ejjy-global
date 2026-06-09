import dayjs from 'dayjs';
import React from 'react';
import { ReceivingReport } from '../../../types';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EMPTY_CELL } from '../../../print/helper-receipt';
import { ReceiptHeader } from '../../Printing';

type Props = {
	receivingReport: ReceivingReport;
};

export const ReceivingReportContent = ({ receivingReport }: Props) => (
	<>
		<ReceiptHeader
			title="RECEIVING REPORT"
			branchHeader={receivingReport.branch}
		/>

		<br />

		<table style={{ width: '100%' }}>
			<tbody>
				{receivingReport.receiving_voucher_products.map((item, index) => (
					<React.Fragment key={index}>
						<tr>
							<td>{item.product.name}</td>
						</tr>
						<tr>
							<td style={{ paddingLeft: 30 }}>
								{formatQuantity(item.quantity, item.product)}
							</td>
						</tr>
					</React.Fragment>
				))}
			</tbody>
		</table>

		<br />

		<table style={{ width: '100%' }}>
			<tbody>
				<tr>
					<td>
						Encoder: {getFullName(receivingReport?.encoded_by) || EMPTY_CELL}
					</td>
					<td style={{ textAlign: 'right' }}>
						Inspector: {getFullName(receivingReport.checked_by) || EMPTY_CELL}
					</td>
				</tr>
			</tbody>
		</table>

		<br />

		<div>Vendor: {receivingReport.supplier_name}</div>

		<br />

		<div>GDT: {formatDateTime(receivingReport.datetime_created)}</div>
		<div>PDT: {formatDateTime(dayjs(), false)}</div>

		<br />
	</>
);
