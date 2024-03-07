import dayjs from 'dayjs';
import { RequisitionSlip, SiteSettings, User } from '../../types';
import {
	formatDateTime,
	formatQuantity,
	getFullName,
	getProductCode,
	getRequestor,
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
        <td style="text-align: right">${requisitionSlip.id}</td>
      </tr>
      <tr>
        <td>Requestor:</td>
        <td style="text-align: right">${getRequestor(requisitionSlip)}</td>
      </tr>
    </table>

    <br />

    ${
			isPdf
				? `
        <table style="width: 100%;">
          <thead>
            <tr>
              <th style="text-align: left; font-weight: normal">NAME</th>
              <th style="text-align: center; font-weight: normal">QTY ORDERED</th>
              <th style="text-align: right; font-weight: normal">QTY SERVED</th>
            </tr>
          </thead>
          <tbody>
            ${requisitionSlip.products
							.map(
								({ quantity_piece, product }) => `
                <tr>
                  <td>
                    <span style="display:block">${product.name}</span>
                    <small>CODE: ${getProductCode(product)}</small>
                  </td>

                  <td style="text-align: center">
                    ${formatQuantity(quantity_piece, product)}
                  </td>

                  <td style="text-align: left">-</td>
                </tr>
              `,
							)
							.join('')}
          </tbody>
        </table>
      `
				: `
        <table style="width: 100%;">
          ${requisitionSlip.products
						.map(
							({ quantity_piece, product }) => `
              <tr>
                <td colspan="2">${product.name}</td>
              </tr>
              <tr>
                <td style="padding-left: 4ch; width: 50%">
                ${formatQuantity(quantity_piece, product)}</td>
                <td style="width: 50%">-</td>
              </tr>`,
						)
						.join('')}
        </table>
        `
		}

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
