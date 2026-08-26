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

	// Inline fill-in blank for the dynamic fields in the body sentence. A shared
	// style keeps every underline visually consistent (same thickness, padding,
	// baseline) and evenly sized via a common minimum widath; the generous body
	// line-height below stops adjacent underlines from colliding when the
	// sentence wraps.
	const fillIn: CSSProperties = {
		display: 'inline-block',
		minWidth: 120,
		margin: '0 6px',
		padding: '0 8px',
		borderBottom: '1px solid black',
		textAlign: 'center',
		fontWeight: 'bold',
		lineHeight: 1.2,
		verticalAlign: 'baseline',
	};

	// Underlined value in the OP No / Date meta row: grows to fill its column,
	// with left padding so the value doesn't touch its label.
	const metaValue: CSSProperties = {
		flex: 1,
		borderBottom: '1px solid black',
		padding: '0 6px 1px',
		textAlign: 'center',
		fontWeight: 'bold',
	};

	const metaLabel: CSSProperties = {
		flexShrink: 0,
		marginRight: 10,
		fontWeight: 'bold',
	};

	// Layout-critical styling is expressed inline (not via Tailwind utility
	// classes) so the three render paths look identical: the on-screen modal and
	// the jsPDF path both sit in the live app DOM where Tailwind is loaded, but
	// the QZ HTML print path renders the standalone markup with only the width
	// rule appendHtmlElement injects — no Tailwind. Inline styles apply in all
	// three. `font-mono text-sm` stays on the root purely as a harmless hint for
	// the modal; the print/PDF container already sets a monospace font.
	return (
		<div className="font-mono text-sm">
			<div className="text-center font-bold">
				{storeName ? (
					<div style={{ whiteSpace: 'pre-line' }}>{storeName}</div>
				) : null}
				{branchName ? <div>{branchName}</div> : null}
			</div>

			{/* Title */}
			<div
				style={{
					textAlign: 'center',
					fontSize: '1.35em',
					fontWeight: 'bold',
					letterSpacing: 3,
					margin: '20px 0 24px',
				}}
			>
				ORDER OF PAYMENT
			</div>

			{/* Meta row — OP No / Date */}
			<div style={{ display: 'flex', gap: 48, marginBottom: 24 }}>
				<div style={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
					<span style={metaLabel}>OP No:</span>
					<span style={metaValue}>{opNo}</span>
				</div>
				<div style={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
					<span style={metaLabel}>Date:</span>
					<span style={metaValue}>{date}</span>
				</div>
			</div>

			{/* Recipient block */}
			<div style={{ marginBottom: 20 }}>
				<div style={{ fontWeight: 'bold' }}>The Cashier</div>
				<div>Cashiering Unit</div>
			</div>

			{/* Body */}
			<div style={{ textAlign: 'left', lineHeight: 2.4, textIndent: 40 }}>
				Please issue Collection Receipt in favor of
				<span style={fillIn}>{payor}</span> from
				<span style={fillIn}>{address}</span> in the amount of
				<span style={fillIn}>{amount}</span> for payment of
				<span style={fillIn}>{purposeDescription}</span> per Charge Invoice No.
				<span style={fillIn}>{invoiceId}</span> dated
				<span style={fillIn}>{invoiceDate}</span>.
			</div>

			{/* Signature */}
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 56 }}
			>
				<div
					style={{
						width: '45%',
						textAlign: 'center',
						borderTop: '1px solid black',
						paddingTop: 6,
					}}
				>
					Manager/Authorized Official
				</div>
			</div>
		</div>
	);
};
