import dayjs from 'dayjs';
import { RequisitionSlip, SiteSettings, User } from '../../types';
import {
	formatDateTime,
	formatQuantity,
	getFullName,
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
 	<div style="${getPageStyle('padding: 12px; width: 3in;')}">
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
        <td>ID:</td>
        <td style="text-align: right">${formatRequisitionSlipId(requisitionSlip.id)}</td>
      </tr>
      <tr>
        <td>Requestor:</td>
        <td style="text-align: right">${getFullName(requisitionSlip?.prepared_by)}</td>
      </tr>
    </table>

    <br />

    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left">Product Name</th>
          <th style="text-align: right">Quantity</th>
        </tr>
      </thead>
            <div style="width: 100%; text-align: right">----------------</div>
      <tbody>
        ${requisitionSlip.products
					.map(
						({ quantity, product }) => `
          <tr>
            <td>${product.name}</td>
            <td style="text-align: right">${formatQuantity(quantity, product)}</td>
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
