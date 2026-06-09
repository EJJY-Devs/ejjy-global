import dayjs from 'dayjs';
import React from 'react';
import { RequisitionSlip, User } from '../../../types';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { ReceiptHeader } from '../../Printing';

type Props = {
	requisitionSlip: RequisitionSlip;
	user?: User;
};

export const RequisitionSlipContent = ({ requisitionSlip, user }: Props) => (
	<>
		<ReceiptHeader
			title="REQUISITION SLIP"
			branchHeader={requisitionSlip.branch}
		/>

		<br />

		<table style={{ width: '100%' }}>
			<tbody>
				<tr>
					<td>Date &amp; Time Requested:</td>
					<td style={{ textAlign: 'right' }}>
						{formatDateTime(requisitionSlip.datetime_created)}
					</td>
				</tr>
				<tr>
					<td>Requestor:</td>
					<td style={{ textAlign: 'right' }}>
						{getFullName(requisitionSlip?.approved_by)}
					</td>
				</tr>
				<tr>
					<td>Customer:</td>
					<td style={{ textAlign: 'right' }}>
						{requisitionSlip?.branch?.name}
					</td>
				</tr>
				<tr>
					<td>ID:</td>
					<td style={{ textAlign: 'right' }}>
						{requisitionSlip?.reference_number}
					</td>
				</tr>
				<tr>
					<td>Vendor:</td>
					<td style={{ textAlign: 'right' }}>
						{requisitionSlip?.vendor?.name}
					</td>
				</tr>
			</tbody>
		</table>

		<br />

		<table style={{ width: '100%', borderCollapse: 'collapse' }}>
			<thead>
				<tr>
					<th style={{ textAlign: 'left' }}>Product Name</th>
					<th style={{ textAlign: 'center' }}>Unit</th>
					<th style={{ textAlign: 'center' }}>Quantity</th>
				</tr>
				<tr>
					<td
						colSpan={3}
						style={{ borderBottom: '1px solid black' }}
					/>
				</tr>
			</thead>
			<tbody>
				{requisitionSlip.products.map(({ quantity, product, unit }, index) => (
					<tr key={index}>
						<td>{product.name}</td>
						<td style={{ textAlign: 'center' }}>{unit || ''}</td>
						<td style={{ textAlign: 'center' }}>
							{formatQuantity(quantity, product)}
						</td>
					</tr>
				))}
			</tbody>
		</table>

		<br />

		<table style={{ width: '100%' }}>
			<tbody>
				<tr>
					<td>Print Details:</td>
					<td style={{ textAlign: 'right' }}>
						{dayjs().format('MM/DD/YYYY h:mmA')} {user?.employee_id}
					</td>
				</tr>
			</tbody>
		</table>
	</>
);
