import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import { EMPTY_CELL } from '../../../globals/constants';
import { RequisitionSlip } from '../../../types';
import { formatQuantity, getFullName } from '../../../utils';
import { ReceiptHeaderV2 } from '../../Printing';

type RequisitionSlipProduct = RequisitionSlip['products'][number];

type Props = {
	requisitionSlip: RequisitionSlip;
	user?: unknown;
};

export const RequisitionSlipContent = ({ requisitionSlip }: Props) => {
	const columns: ColumnsType<RequisitionSlipProduct> = [
		{
			title: 'Product Name',
			dataIndex: 'product',
			key: 'name',
			render: (product) => product.name,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			align: 'center',
			render: (quantity, item) => formatQuantity(quantity, item.product),
		},
		{
			title: 'Unit',
			dataIndex: 'unit',
			key: 'unit',
			align: 'center',
			render: (unit) => unit || EMPTY_CELL,
		},
	];

	const datetimeRequested = requisitionSlip.datetime_created
		? dayjs(requisitionSlip.datetime_created).format('MM/DD/YYYY h:mmA')
		: EMPTY_CELL;

	const currentDateTime = dayjs().format('MM/DD/YYYY h:mmA');

	return (
		<div className="font-mono text-sm">
			<div className="text-center">
				<ReceiptHeaderV2 branchHeader={requisitionSlip.branch} />
				<br />
				<strong>REQUISITION SLIP</strong>
				<br />
				<br />
				<div>Datetime Requested:</div>
				<div>{datetimeRequested}</div>
				<br />
			</div>

			<table style={{ width: '100%' }}>
				<tbody>
					<tr>
						<td>Reference #:</td>
						<td style={{ textAlign: 'right' }}>
							{requisitionSlip.reference_number || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Vendor:</td>
						<td style={{ textAlign: 'right' }}>
							{requisitionSlip.vendor?.name || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Customer:</td>
						<td style={{ textAlign: 'right' }}>
							{requisitionSlip.branch?.name || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Encoder:</td>
						<td style={{ textAlign: 'right' }}>
							{getFullName(requisitionSlip.authorizer) || EMPTY_CELL}
						</td>
					</tr>
				</tbody>
			</table>

			<br />

			<Table
				columns={columns}
				dataSource={requisitionSlip.products}
				pagination={false}
				rowKey="id"
				size="small"
			/>

			<br />

			<div className="text-center">
				<div>Print Details: {currentDateTime}</div>
				{requisitionSlip.overall_remarks && (
					<div>Remarks: {requisitionSlip.overall_remarks}</div>
				)}
			</div>

			<br />
		</div>
	);
};
