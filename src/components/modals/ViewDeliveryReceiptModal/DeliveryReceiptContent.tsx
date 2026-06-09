import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import { EMPTY_CELL } from '../../../globals/constants';
import { DeliveryReceipt, DeliveryReceiptProduct } from '../../../types';
import { formatQuantity, getFullName } from '../../../utils';
import { ReceiptHeaderV2 } from '../../Printing';

type Props = {
	deliveryReceipt: DeliveryReceipt;
};

export const DeliveryReceiptContent = ({ deliveryReceipt }: Props) => {
	const columns: ColumnsType<DeliveryReceiptProduct> = [
		{
			title: 'Product Name',
			dataIndex: 'product',
			key: 'name',
			render: (product) => product.name,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity_returned',
			key: 'quantity',
			align: 'center',
			render: (quantity, item) =>
				formatQuantity(Number(quantity), item.product),
		},
	];

	const currentDateTime = dayjs().format('MM/DD/YYYY h:mmA');
	const datetimeGenerated = deliveryReceipt.datetime_created
		? dayjs(deliveryReceipt.datetime_created).format('MM/DD/YYYY h:mmA')
		: EMPTY_CELL;

	return (
		<div className="font-mono text-sm">
			<div className="text-center">
				<ReceiptHeaderV2 branchHeader={deliveryReceipt.branch} />
				<br />
				<strong>DELIVERY RECEIPT</strong>
				<br />
				<br />
				<div>Datetime Generated:</div>
				<div>{datetimeGenerated}</div>
				<br />
			</div>

			<table style={{ width: '100%' }}>
				<tbody>
					<tr>
						<td>Reference #:</td>
						<td style={{ textAlign: 'right' }}>
							{deliveryReceipt.reference_number || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Vendor:</td>
						<td style={{ textAlign: 'right' }}>
							{deliveryReceipt.branch?.name || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Customer:</td>
						<td style={{ textAlign: 'right' }}>
							{deliveryReceipt.customer_name || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Encoder:</td>
						<td style={{ textAlign: 'right' }}>
							{getFullName(deliveryReceipt.encoded_by) || EMPTY_CELL}
						</td>
					</tr>
				</tbody>
			</table>

			<br />

			<Table
				columns={columns}
				dataSource={deliveryReceipt.products}
				pagination={false}
				rowKey="id"
				size="small"
			/>

			<br />

			<div className="text-center">
				<div>Print Details: {currentDateTime}</div>
				{deliveryReceipt.overall_remarks && (
					<div>Remarks: {deliveryReceipt.overall_remarks}</div>
				)}
			</div>

			<br />
		</div>
	);
};
