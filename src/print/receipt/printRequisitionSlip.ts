import dayjs from 'dayjs';
import { RequisitionSlip, SiteSettings, User } from '../../types';
import {
	formatDateTime,
	formatQuantity,
	getFullName,
	getProductCode,
	getRequestor,
	formatRequisitionSlipId,
} from '../../utils';
import {
	appendHtmlElement,
	getHeader,
	getPageStyle,
	print,
} from '../helper-receipt';

export const printRequisitionSlip = (
	requisitionSlip: RequisitionSlip,
	siteSettings: SiteSettings,
	user: User,
	isPdf = false,
) => {
	const data = `
  <div class="container" style="${getPageStyle()}">
  ${getHeader(siteSettings, undefined, 'REQUISITION SLIP')}

    <br />

    <table style="width: 100%;">
      <tr>
        <td>Date & Time Requested:</td>
        <td style="text-align: right">${formatDateTime(
					requisitionSlip.datetime_created,
				)}</td>
      </tr>
      <tr>
        <td>F-RS1:</td>
        <td style="text-align: right">${formatRequisitionSlipId(requisitionSlip.id)}</td>
      </tr>
      <tr>
        <td>Requestor:</td>
        <td style="text-align: right">${getRequestor(requisitionSlip)}</td>
      </tr>
    </table>

    <br />

    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left; font-weight: bold; border-bottom: 1px solid #000;">Product Name</th>
          <th style="text-align: left; font-weight: bold; border-bottom: 1px solid #000;">Code</th>
          <th style="text-align: center; font-weight: bold; border-bottom: 1px solid #000;">Quantity Ordered</th>
        </tr>
      </thead>
      <tbody>
        ${requisitionSlip.products
					.map(
						({ quantity_piece, product }) => `
          <tr>
            <td>${product.name}</td>
            <td>${getProductCode(product)}</td>
            <td style="text-align: center">${formatQuantity(quantity_piece, product)}</td>
          </tr>
        `,
					)
					.join('')}
      </tbody>
    </table>

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

	print(data, 'Requisition Slip');
};
