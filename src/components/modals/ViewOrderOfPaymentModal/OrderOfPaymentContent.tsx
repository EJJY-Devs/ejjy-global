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

	// Inline underline for the fill-in values in the body sentence. Kept as an
	// INLINE span (not inline-block) with a bottom border so the underline tracks
	// the text baseline. jsPDF's html2canvas mis-positions bottom borders on
	// inline-block elements whose line-height differs from the surrounding line —
	// that was drawing the underlines *through* the values in the generated PDF.
	const fillIn: CSSProperties = {
		borderBottom: '1px solid black',
		padding: '0 10px',
		fontWeight: 'bold',
		whiteSpace: 'nowrap',
	};

	// The meta row and signature line are laid out with <table>, not flexbox:
	// tables + cell borders are the primitive html2canvas renders reliably, so
	// the OP No / Date underlines and the signature rule land in the right place
	// in the PDF and print output (flex alignment + borders did not).
	const metaLabelCell: CSSProperties = {
		whiteSpace: 'nowrap',
		fontWeight: 'bold',
		paddingRight: 10,
		width: 1,
	};
	const metaValueCell: CSSProperties = {
		borderBottom: '1px solid black',
		textAlign: 'center',
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
		<div
			className="font-mono text-sm"
			style={{ boxSizing: 'border-box', padding: '16px 32px', lineHeight: 1.5 }}
		>
			{/* Header — company / branch */}
			<div style={{ textAlign: 'center' }}>
				{storeName ? (
					<div
						style={{
							whiteSpace: 'pre-line',
							letterSpacing: 1,
							fontSize: '1.125em',
							fontWeight: 'bold',
						}}
					>
						{storeName}
					</div>
				) : null}
				{branchName ? (
					<div style={{ fontWeight: 'bold' }}>{branchName}</div>
				) : null}
			</div>

			{/* Title */}
			<div
				style={{
					textAlign: 'center',
					fontSize: '1.35em',
					fontWeight: 'bold',
					letterSpacing: 3,
					margin: '18px 0 22px',
				}}
			>
				ORDER OF PAYMENT
			</div>

			{/* Meta row — OP No / Date */}
			<table style={{ width: '100%', marginBottom: 22 }}>
				<tbody>
					<tr>
						<td style={metaLabelCell}>OP No:</td>
						<td style={metaValueCell}>{opNo}</td>
						<td style={{ width: 48 }} />
						<td style={metaLabelCell}>Date:</td>
						<td style={metaValueCell}>{date}</td>
					</tr>
				</tbody>
			</table>

			{/* Recipient block */}
			<div style={{ marginBottom: 18 }}>
				<div style={{ fontWeight: 'bold' }}>The Cashier</div>
				<div>Cashiering Unit</div>
			</div>

			{/* Body */}
			<div style={{ textAlign: 'left', lineHeight: 2, textIndent: 40 }}>
				Please issue Collection Receipt in favor of{' '}
				<span style={fillIn}>{payor}</span> from{' '}
				<span style={fillIn}>{address}</span> in the amount of{' '}
				<span style={fillIn}>{amount}</span> for payment of{' '}
				<span style={fillIn}>{purposeDescription}</span> per Charge Invoice No.{' '}
				<span style={fillIn}>{invoiceId}</span> dated{' '}
				<span style={fillIn}>{invoiceDate}</span>.
			</div>

			{/* Signature */}
			<table style={{ width: '100%', marginTop: 44 }}>
				<tbody>
					<tr>
						<td style={{ width: '55%' }} />
						<td
							style={{
								width: '45%',
								borderTop: '1px solid black',
								textAlign: 'center',
								paddingTop: 6,
							}}
						>
							Manager/Authorized Official
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
