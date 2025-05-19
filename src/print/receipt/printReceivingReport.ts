import dayjs from 'dayjs';
import { ReceivingVoucher, SiteSettings } from '../../types';
import {
	formatDateTime,
	formatInPeso,
	formatQuantity,
	getFullName,
} from '../../utils';
import {
	EMPTY_CELL,
	PESO_SIGN,
	appendHtmlElement,
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

	const products = receivingVoucher?.products;

	const data = `
	<div className="container" style="${getPageStyle()}">
		${getHeader(siteSettings, undefined, 'RECEIVING REPORT')}

		<br />

		<table style="width: 100%;">
			${products
				.map(
					(item) => `<tr>
						<td colspan="2">
							${item.product.name}
						</td>
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
				<td>TOTAL AMOUNT</td>
				<td style="text-align: right; font-weight: bold;">
					${formatInPeso(receivingVoucher.amount_paid, PESO_SIGN)}
				</td>
			</tr>
		</table>

		<br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Encoder: ${getFullName(receivingVoucher?.encoded_by) || EMPTY_CELL}</span>
			<span style="text-align: right;">Inspector: ${
				getFullName(receivingVoucher.checked_by) || EMPTY_CELL
			}</span>
		</div>

		<br />
		<div>Vendor: ${receivingVoucher.supplier_name}</div>

		<br />
	<div>GDT: ${formatDateTime(receivingVoucher.datetime_created)}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>
		<br />
	</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Receiving Report');
};
