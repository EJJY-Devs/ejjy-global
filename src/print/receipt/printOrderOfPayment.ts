import { orderOfPaymentPurposes } from '../../globals';
import { OrderOfPayment } from '../../types';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	getFullName,
} from '../../utils';
import { PESO_SIGN, getPageStyle } from '../helper-receipt';

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

	const letterStyles =
		'display: inline-block; min-width: 225px; padding: 0 8px; border-bottom: 2px solid black; text-align:center; font-weight: bold';

	const data = `
		<div style="${getPageStyle('padding: 24px; width: 795px;')}">
			<div><b>Entity Name: EJ & JY WET MARKET AND ENTERPRISES</b></div>
			<div style="display:flex; justify-content: space-between">
				<div>
					<b>OP No.: <span style="width: 200px; display: inline-block; border-bottom: 2px solid black; text-align:center;">${opNo}</span></b>
				</div>
				<div>
					<b>Date: <span style="width: 200px; display: inline-block; border-bottom: 2px solid black; text-align:center;">${date}</span></b>
				</div>
			</div>

			<br/>
			<br/>

			<div style="font-size: 1.5em; font-weight: bold; text-align: center">ORDER OF PAYMENT</div>

			<br/>

			<div><b>The Cashier</b></div>
			<div>Cashiering Unit</div>

			<br/>
			<br/>

			<div style="text-align: justify">&emsp;&emsp;&emsp;Please issue Collection Receipt in favor of
				<span style="${letterStyles}">${payor}</span> from
				<span style="${letterStyles}; min-width: 300px">${address}</span> in the amount of
				<span style="${letterStyles}">${amount}</span> for payment of
				<span style="${letterStyles}">${purposeDescription}</span> per Charge Invoice No.
				<span style="${letterStyles}">${invoiceId}</span> dated
				<span style="${letterStyles}">${invoiceDate}</span>.
			</div>

			<br/>
			<br/>
			<br/>
			<br/>
			<br/>

			<div style="padding: 0 12px; width: 60%; border-top: 2px solid black; float:right; text-align: center;">
				Manager/Authorized Official
			</div>
		</div>
	`;

	return data;
};
