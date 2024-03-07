import dayjs from 'dayjs';
import { vatTypes } from '../../globals';
import { ReceivingVoucher, SiteSettings } from '../../types';
import { formatDateTime, formatInPeso, formatQuantity } from '../../utils';
import {
	PESO_SIGN,
	appendHtmlElement,
	getFooter,
	getHeader,
	getPageStyle,
	print,
} from '../helper-receipt';

export const printReceivingVoucherForm = (
	receivingVoucher: ReceivingVoucher,
	siteSettings: SiteSettings,
	isPdf = false,
) => {
	/**
	 * * The following details are hidden as it is not implemented yet (per Emman):
	 * * 1. Invoice #
	 */

	const products = receivingVoucher.products;

	const data = `
	<div class="container" style="${getPageStyle()}">
		${getHeader(siteSettings, undefined, 'RECEIVING VOUCHER')}

		<br />

		<table style="width: 100%;">
			${products
				.map(
					(item) => `<tr>
						<td colspan="2">${item.product.name} - ${
						item.product.is_vat_exempted ? vatTypes.VAT_EMPTY : vatTypes.VATABLE
					}</td>
					</tr>
					<tr>
						<td style="padding-left: 30px">${formatQuantity(
							item.quantity,
							item.product,
						)} @ ${formatInPeso(item.cost_per_piece, PESO_SIGN)}</td>
						<td style="text-align: right">
							${formatInPeso(Number(item.quantity) * Number(item.cost_per_piece), PESO_SIGN)}
						</td>
					</tr>`,
				)
				.join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<table style="width: 100%;">
			<tr>
				<td>TOTAL AMOUNT PAID</td>
				<td style="text-align: right; font-weight: bold;">
					${formatInPeso(receivingVoucher.amount_paid, PESO_SIGN)}
				</td>
			</tr>
		</table>

		<br />

    <div>GDT: ${formatDateTime(receivingVoucher.datetime_created)}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>
		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${receivingVoucher.checked_by.employee_id}</span>
			<span style="text-align: right;">E: ${
				receivingVoucher.encoded_by.employee_id
			}</span>
		</div>
		<div>Supplier: ${receivingVoucher.supplier_name}</div>

		<br />

		${getFooter(siteSettings)}
	</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Receiving Voucher');
};
