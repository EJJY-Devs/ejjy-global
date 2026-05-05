import dayjs from 'dayjs';
import React from 'react';
import { EMPTY_CELL } from '../../../globals';
import { PESO_SIGN } from '../../../print/helper-receipt';
import { DeliveryInvoice } from '../../../types';
import { SiteSettings } from '../../../types';
import { formatDateTime, formatInPeso } from '../../../utils';
import { ReceiptFooter, ReceiptHeader } from '../../Printing';

type Props = {
	deliveryInvoice: DeliveryInvoice;
	siteSettings: SiteSettings;
	isReprint?: boolean;
};

export const DeliveryInvoiceContent = ({
	deliveryInvoice,
	siteSettings,
	isReprint,
}: Props) => {
	const totalAmount =
		deliveryInvoice?.products?.reduce(
			(sum, item) =>
				sum + Number(item.quantity) * Number(item.price_per_piece || 0),
			0,
		) || 0;

	return (
		<>
			<ReceiptHeader
				branchMachine={deliveryInvoice?.branch_machine}
				title="DELIVERY INVOICE"
			/>

			<br />

			<table style={{ width: '100%' }}>
				{deliveryInvoice?.products?.map((item, index) => (
					<tbody key={index}>
						<tr>
							<td colSpan={2}>{item?.product?.name || 'Product'}</td>
						</tr>
						<tr>
							<td style={{ paddingLeft: '4ch' }}>
								{item.quantity} @{' '}
								{formatInPeso(Number(item.price_per_piece), PESO_SIGN)}
							</td>
							<td style={{ textAlign: 'right' }}>
								{formatInPeso(
									Number(item.quantity) * Number(item.price_per_piece || 0),
									PESO_SIGN,
								)}
								&nbsp;
							</td>
						</tr>
					</tbody>
				))}
			</table>

			<div style={{ width: '100%', textAlign: 'right' }}>----------------</div>

			<table style={{ width: '100%' }}>
				<tbody>
					<tr>
						<td>TOTAL AMOUNT</td>
						<td style={{ textAlign: 'right', fontWeight: 'bold' }}>
							{formatInPeso(totalAmount, PESO_SIGN)}&nbsp;
						</td>
					</tr>
				</tbody>
			</table>

			<br />

			<div>GDT: {formatDateTime(deliveryInvoice?.created_at)}</div>
			<div>PDT: {formatDateTime(dayjs(), false)}</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<span>{deliveryInvoice?.or_number || EMPTY_CELL}</span>
				<span>{deliveryInvoice?.products?.length || 0} item(s)</span>
			</div>

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
			<br />

			<div
				style={{
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{isReprint && <span>REPRINT ONLY</span>}
				<span>"{siteSettings?.thank_you_message}"</span>
			</div>
		</>
	);
};
