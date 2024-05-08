import React, { CSSProperties } from 'react';
import ReactDOMServer from 'react-dom/server';
import { orderOfPaymentPurposes } from '../../globals';
import { OrderOfPayment } from '../../types';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	getFullName,
} from '../../utils';
import { PESO_SIGN, getPageStyleObject } from '../helper-receipt';

export const printOrderOfPayment = (orderOfPayment: OrderOfPayment) => {
	const opNo = orderOfPayment.id;
	const date = formatDate(orderOfPayment.datetime_created);
	const payor = getFullName(orderOfPayment.payor);
	const address = orderOfPayment.payor.home_address;
	const amount = formatInPeso(orderOfPayment.amount, PESO_SIGN);
	const invoiceId =
		orderOfPayment?.charge_sales_transaction?.invoice?.or_number || '&nbsp;';
	const invoiceDate = orderOfPayment?.charge_sales_transaction
		? formatDateTime(
				orderOfPayment.charge_sales_transaction.invoice.datetime_created,
			)
		: '&nbsp;';

	let purposeDescription = orderOfPayment.extra_description;
	if (orderOfPayment.purpose === orderOfPaymentPurposes.PARTIAL_PAYMENT) {
		purposeDescription = 'Partial Payment';
	} else if (orderOfPayment.purpose === orderOfPaymentPurposes.FULL_PAYMENT) {
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

	const dataDom = ReactDOMServer.renderToStaticMarkup(
		<div
			className="container"
			style={getPageStyleObject({ padding: 24, width: 460 })}
		>
			<div>
				<b>Entity Name: EJ & JY WET MARKET AND ENTERPRISES</b>
			</div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					columnGap: 10,
					fontWeight: 'bold',
				}}
			>
				<div style={{ width: '100%', display: 'flex' }}>
					<span style={{ flexShrink: 0 }}>OP No:</span>
					<div
						style={{
							flexGrow: 1,
							borderBottom: '2px solid black',
							textAlign: 'center',
						}}
					>
						{opNo}
					</div>
				</div>

				<div style={{ width: '100%', display: 'flex' }}>
					<span style={{ flexShrink: 0 }}>Date:</span>
					<div
						style={{
							flexGrow: 1,
							borderBottom: '2px solid black',
							textAlign: 'center',
						}}
					>
						{date}
					</div>
				</div>
			</div>

			<br />
			<br />

			<div
				style={{
					fontSize: '1.5em',
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				ORDER OF PAYMENT
			</div>

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

			<div
				style={{
					padding: '0 12px',
					width: '60%',
					borderTop: '2px solid black',
					float: 'right',
					textAlign: 'center',
				}}
			>
				Manager/Authorized Official
			</div>
		</div>,
	);

	return dataDom;
};
