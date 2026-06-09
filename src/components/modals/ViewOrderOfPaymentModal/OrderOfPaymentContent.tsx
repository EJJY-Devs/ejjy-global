import React, { CSSProperties } from 'react';
import { orderOfPaymentPurposes } from '../../../globals';
import { OrderOfPayment } from '../../../types';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	getFullName,
} from '../../../utils';
import { PESO_SIGN } from '../../../print/helper-receipt';

type Props = {
	orderOfPayment: OrderOfPayment;
};

export const OrderOfPaymentContent = ({ orderOfPayment }: Props) => {
	const storeName = orderOfPayment?.branch?.store_name || '';
	const branchName = orderOfPayment?.branch?.name || '';

	const opNo = orderOfPayment?.reference_number || '';
	const date = formatDate(orderOfPayment?.datetime_created);
	const payor = getFullName(orderOfPayment?.payor);
	const address = orderOfPayment?.payor?.home_address;
	const amount = formatInPeso(orderOfPayment?.amount, PESO_SIGN);
	const invoiceId =
		orderOfPayment?.charge_sales_transaction?.invoice?.or_number || '';
	const invoiceDate = orderOfPayment?.charge_sales_transaction
		? formatDateTime(
				orderOfPayment?.charge_sales_transaction?.invoice?.datetime_created,
			)
		: '';

	let purposeDescription = orderOfPayment?.extra_description;
	if (orderOfPayment?.purpose === orderOfPaymentPurposes.PARTIAL_PAYMENT) {
		purposeDescription = 'Partial Payment';
	} else if (orderOfPayment?.purpose === orderOfPaymentPurposes.FULL_PAYMENT) {
		purposeDescription = 'Full Payment';
	}

	const letterStyles: CSSProperties = {
		display: 'inline-block',
		minWidth: 100,
		padding: '0 8px',
		borderBottom: '2px solid black',
		textAlign: 'center',
		fontWeight: 'bold',
	};

	return (
		<div className="font-mono text-sm">
			<div className="text-center font-bold">
				{storeName ? (
					<div style={{ whiteSpace: 'pre-line' }}>{storeName}</div>
				) : null}
				{branchName ? <div>{branchName}</div> : null}
			</div>

			<br />

			<div className="flex w-full justify-between gap-2 font-bold">
				<div className="flex w-full">
					<span className="shrink-0">OP No:</span>
					<div
						style={{ borderBottom: '2px solid black' }}
						className="grow text-center"
					>
						{opNo}
					</div>
				</div>
				<div className="flex w-full">
					<span className="shrink-0">Date:</span>
					<div
						style={{ borderBottom: '2px solid black' }}
						className="grow text-center"
					>
						{date}
					</div>
				</div>
			</div>

			<br />
			<br />

			<div className="text-center text-xl font-bold">ORDER OF PAYMENT</div>

			<br />

			<div>
				<b>The Cashier</b>
			</div>
			<div>Cashiering Unit</div>

			<br />
			<br />

			<div style={{ textAlign: 'justify' }}>
				&emsp;&emsp;&emsp;Please issue Collection Receipt in favor of
				<span style={letterStyles}>{payor}</span> from
				<span style={letterStyles}>{address}</span> in the amount of
				<span style={letterStyles}>{amount}</span> for payment of
				<span style={letterStyles}>{purposeDescription}</span> per Charge
				Invoice No.
				<span style={letterStyles}>{invoiceId}</span> dated
				<span style={letterStyles}>{invoiceDate}</span>.
			</div>

			<br />
			<br />
			<br />
			<br />
			<br />

			<div className="float-right w-3/5 text-center" style={{ borderTop: '2px solid black', padding: '0 12px' }}>
				Manager/Authorized Official
			</div>
		</div>
	);
};
