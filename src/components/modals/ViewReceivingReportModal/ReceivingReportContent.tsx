import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import { EMPTY_CELL } from '../../../globals/constants';
import { ReceivingReport, ReceivingReportProduct } from '../../../types';
import { formatQuantity, getFullName } from '../../../utils';
import { ReceiptHeaderV2 } from '../../Printing';

type Props = {
	receivingReport: ReceivingReport;
};

export const ReceivingReportContent = ({ receivingReport }: Props) => {
	const columns: ColumnsType<ReceivingReportProduct> = [
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
	];

	const currentDateTime = dayjs().format('MM/DD/YYYY h:mmA');

	return (
		<div className="font-mono text-sm">
			<div className="text-center">
				<ReceiptHeaderV2 branchHeader={receivingReport.branch} />
				<br />
				<strong>RECEIVING REPORT</strong>
				<br />
				<br />
			</div>

			<table style={{ width: '100%' }}>
				<tbody>
					<tr>
						<td>Reference #:</td>
						<td style={{ textAlign: 'right' }}>
							{receivingReport.reference_number || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Vendor:</td>
						<td style={{ textAlign: 'right' }}>
							{receivingReport.supplier_name || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Customer:</td>
						<td style={{ textAlign: 'right' }}>
							{receivingReport.branch?.name || EMPTY_CELL}
						</td>
					</tr>
					<tr>
						<td>Encoder:</td>
						<td style={{ textAlign: 'right' }}>
							{getFullName(receivingReport.encoded_by) || EMPTY_CELL}
						</td>
					</tr>
				</tbody>
			</table>

			<br />

			<Table
				columns={columns}
				dataSource={receivingReport.receiving_voucher_products}
				pagination={false}
				rowKey="id"
				size="small"
			/>

			<br />

			<div>Print Details: {currentDateTime}</div>
			{receivingReport.overall_remarks && (
				<div>Remarks: {receivingReport.overall_remarks}</div>
			)}

			<br />
		</div>
	);
};
