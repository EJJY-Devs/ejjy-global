import dayjs from 'dayjs';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import {
	EMPTY_CELL,
	getHeader,
	getPageStyle,
	print,
	appendHtmlElement,
} from '../../helper-receipt';
import { PrintDeliveryReceipt } from './types';

export const printDeliveryReceiptHtml = ({
	deliveryReceipt,
	siteSettings,
	isPdf = false,
}: PrintDeliveryReceipt) => {
	const products = deliveryReceipt?.products;

	const data = `
	<div className="container" style="${getPageStyle()}">
		${getHeader(siteSettings, undefined, 'DELIVERY RECEIPT', deliveryReceipt.branch)}

		<br />

		<table style="width: 100%; border-collapse: collapse;">
			<thead>
				<tr>
					<th style="text-align: left;">Product Name</th>
					<th style="text-align: center;">Quantity</th>
				</tr>
				<tr>
					<td colspan="2" style="border-bottom: 1px solid black;"></td>
				</tr>
			</thead>
			<tbody>
				${products
					.map(
						(item) => `
							<tr>
								<td>${item.product.name}</td>
								<td style="text-align: center;">
									${formatQuantity(Number(item.quantity_returned), item.product)}
								</td>
							</tr>
						`,
					)
					.join('')}
			</tbody>
		</table>

		<br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Customer: ${deliveryReceipt?.customer_name || EMPTY_CELL}</span>
			<span style="text-align: right;">Encoder: ${
				getFullName(deliveryReceipt?.encoded_by) || EMPTY_CELL
			}</span>
		</div>

		<br />
		<div>Remarks: ${deliveryReceipt?.overall_remarks}</div>

		<br />
		<div>GDT: ${formatDateTime(deliveryReceipt?.datetime_created)}</div>
		<div>PDT: ${formatDateTime(dayjs(), false)}</div>	
		<br />
	</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Delivery Receipt');
};
