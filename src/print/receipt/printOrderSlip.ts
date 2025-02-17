import dayjs from 'dayjs';
import { quantityTypes } from '../../globals';
import { SiteSettings, User } from '../../types';
import {
	formatDateTime,
	getFullName,
	getOrderSlipStatusBranchManagerText,
} from '../../utils';
import {
	getHeader,
	getPageStyle,
	print,
	appendHtmlElement,
} from '../helper-receipt';

// TODO: Finalize once feature is back
export const printOrderSlip = (
	orderSlip: any,
	products: any,
	user: User,
	quantityType: string,
	siteSettings: SiteSettings,
	isPdf = false,
) => {
	const data = `
		<div className="container" style="${getPageStyle('width: 380px')}">
    ${getHeader(siteSettings, undefined, 'ORDER SLIP')}

			<br />

			<table style="width: 100%;">
				<tr>
					<td>Date & Time Requested:</td>
					<td style="text-align: right">${formatDateTime(
						orderSlip?.datetime_created,
					)}</td>
				</tr>
				<tr>
					<td>Requesting Branch:</td>
					<td style="text-align: right">${
						orderSlip?.requisition_slip?.requesting_user?.branch?.name
					}</td>
				</tr>
				<tr>
					<td>Created By:</td>
					<td style="text-align: right">${
						orderSlip?.requisition_slip?.requesting_user?.first_name
					} ${orderSlip?.requisition_slip?.requesting_user?.last_name}</td>
				</tr>
				<tr>
					<td>F-RS1:</td>
					<td style="text-align: right">${orderSlip?.requisition_slip?.id}</td>
				</tr>
				<tr>
					<td>F-OS1:</td>
					<td style="text-align: right">${orderSlip.id}</td>
				</tr>
				<tr>
					<td>Status:</td>
					<td style="text-align: right">${getOrderSlipStatusBranchManagerText(
						orderSlip?.status?.value,
						orderSlip?.status?.percentage_fulfilled * 100,
						orderSlip?.delivery_receipt?.status,
					)}</td>
				</tr>
			</table>

			<br />
			<br />

			<table style="width: 100%;">
				<thead>
					<tr>
						<th style="text-align: left; font-weight: normal">NAME</th>
						<th style="text-align: center; font-weight: normal">QTY REQUESTED<br/>(${
							quantityType === quantityTypes.PIECE ? 'PCS' : 'BULK'
						})</th>
						<th style="text-align: right; font-weight: normal">QTY SERVED</th>
					</tr>
				</thead>
				<tbody>
					${products
						.map(
							(product: any) =>
								`
							<tr>
								<td>
									<span style="display:block">${product.name}</span>
									<small>${product.barcode || product.selling_barcode}</small>
								</td>

								<td style="text-align: center">
									${product.ordered}
								</td>

								<td style="text-align: right">
									<div style="width: 50pt; height: 12pt; border: 0.1pt solid #898989; margin-left: auto;"></div>
								</td>
							</tr>
						`,
						)
						.join('')}
				</tbody>
			</table>

			<br/>
			<br/>

			<table style="width: 100%;">
				<tr>
					<td>Date & Time Printed:</td>
					<td style="text-align: right">${dayjs().format('MM/DD/YYYY h:mmA')}</td>
				</tr>
				<tr>
					<td>Printed By:</td>
					<td style="text-align: right">${getFullName(user)}</td>
				</tr>
			</table>
		</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Order Slip');
};
