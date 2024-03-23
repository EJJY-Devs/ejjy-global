import dayjs from 'dayjs';
import { vatTypes } from '../../globals';
import { BackOrder, SiteSettings } from '../../types';
import { formatDateTime, formatInPeso, formatQuantity } from '../../utils';
import {
	EMPTY_CELL,
	PESO_SIGN,
	getFooter,
	getHeader,
	getPageStyle,
} from '../helper-receipt';

export const printStockOutForm = (
	backOrder: BackOrder,
	siteSettings: SiteSettings,
) => {
	/**
	 * * The following details are hidden as it is not implemented yet (per Emman):
	 * * 1. Supplier
	 * * 2. Check/Authorizer
	 * * 3. Invoice #
	 */

	//    <div style="display: flex; align-items: center; justify-content: space-between">
	//    <span>${formatDateTime(backOrder.datetime_created)}</span>
	//    <span style="text-align: right;">${
	//      backOrder.transaction?.invoice?.or_number || EMPTY_CELL
	//    }</span>
	//  </div>
	//  <div style="display: flex; align-items: center; justify-content: space-between">
	//    <span>C: ${backOrder?.sender?.employee_id || EMPTY_CELL}</span>
	//    <span style="text-align: right;">E: ${
	//      backOrder?.encoded_by?.employee_id || EMPTY_CELL
	//    }</span>
	//  </div>
	//  <div>
	//    <span>Supplier: ${backOrder?.supplier_name || EMPTY_CELL}</span>
	//  </div>

	const products = backOrder.products;
	let totalAmount = 0;

	const data = `
	<div style="${getPageStyle('padding: 24px; width: 380px;')}">
		${getHeader(siteSettings, undefined, 'BO SLIP')}

		<br />

		<table style="width: 100%;">
			${products
				.map((item) => {
					const subtotal =
						Number(item.quantity_returned) *
						Number(item.current_price_per_piece);
					totalAmount += subtotal;

					return `<tr>
						<td colspan="2">${item.product.name} - ${
							item.product.is_vat_exempted
								? vatTypes.VAT_EMPTY
								: vatTypes.VATABLE
						}</td>
					</tr>
					<tr>
						<td style="padding-left: 30px">${formatQuantity(
							Number(item.quantity_returned),
							item.product,
						)} @ ${formatInPeso(item.current_price_per_piece, PESO_SIGN)}</td>
						<td style="text-align: right">
							${formatInPeso(subtotal, PESO_SIGN)}
						</td>
					</tr>`;
				})
				.join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<table style="width: 100%;">
			<tr>
				<td>TOTAL AMOUNT</td>
				<td style="text-align: right; font-weight: bold;">
					${formatInPeso(totalAmount, PESO_SIGN)}
				</td>
			</tr>
		</table>

		<br />

    <div>GDT: ${formatDateTime(backOrder.datetime_created)}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>
		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${EMPTY_CELL}</span>
			<span style="text-align: right;">E: ${
				backOrder?.encoded_by?.employee_id || EMPTY_CELL
			}</span>
		</div>
		<div>Supplier: ${EMPTY_CELL}</div>

		<br />

		${getFooter(siteSettings)}
	</div>
	`;

	return data;
};
