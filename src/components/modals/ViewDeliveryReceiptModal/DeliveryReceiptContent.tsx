import dayjs from 'dayjs';
import React from 'react';
import { DeliveryReceipt } from '../../../types';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EMPTY_CELL } from '../../../print/helper-receipt';
import { ReceiptHeader } from '../../Printing';

type Props = {
	deliveryReceipt: DeliveryReceipt;
};

export const DeliveryReceiptContent = ({ deliveryReceipt }: Props) => (
	<>
		<ReceiptHeader
			title="DELIVERY RECEIPT"
			branchHeader={deliveryReceipt.branch}
		/>

		<br />

		<table style={{ width: '100%', borderCollapse: 'collapse' }}>
			<thead>
				<tr>
					<th style={{ textAlign: 'left' }}>Product Name</th>
					<th style={{ textAlign: 'center' }}>Quantity</th>
				</tr>
				<tr>
					<td colSpan={2} style={{ borderBottom: '1px solid black' }} />
				</tr>
			</thead>
			<tbody>
				{deliveryReceipt.products.map((item, index) => (
					<tr key={index}>
						<td>{item.product.name}</td>
						<td style={{ textAlign: 'center' }}>
							{formatQuantity(Number(item.quantity_returned), item.product)}
						</td>
					</tr>
				))}
			</tbody>
		</table>

		<br />

		<table style={{ width: '100%' }}>
			<tbody>
				<tr>
					<td>
						Customer: {deliveryReceipt?.customer_name || EMPTY_CELL}
					</td>
					<td style={{ textAlign: 'right' }}>
						Encoder: {getFullName(deliveryReceipt?.encoded_by) || EMPTY_CELL}
					</td>
				</tr>
			</tbody>
		</table>

		<br />

		<div>Remarks: {deliveryReceipt?.overall_remarks}</div>

		<br />

		<div>GDT: {formatDateTime(deliveryReceipt?.datetime_created)}</div>
		<div>PDT: {formatDateTime(dayjs(), false)}</div>

		<br />
	</>
);
