import dayjs from 'dayjs';
import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import {
	appendHtmlElement,
	getHeader,
	getPageStyle,
	print,
} from '../../helper-receipt';
import { PrintRequisitionSlip } from './types';

export const printRequisitionSlipHtml = ({
	requisitionSlip,
	siteSettings,
	user,
	isPdf = false,
}: PrintRequisitionSlip) => {
	const data = `
        <div className="container" style="${getPageStyle()}">
  ${getHeader(siteSettings, undefined, 'REQUISITION SLIP', requisitionSlip.branch)}

    <br />

    <table style="width: 100%;">
      <tr>
        <td>Date & Time Requested:</td>
        <td style="text-align: right">${formatDateTime(
					requisitionSlip.datetime_created,
				)}</td>
      </tr>
      <tr>
        <td>Requestor:</td>
        <td style="text-align: right">${getFullName(requisitionSlip?.approved_by)}</td>
      </tr>
      <tr>
        <td>Customer:</td>
        <td style="text-align: right">${requisitionSlip?.branch?.name}</td>
      </tr>
      <tr>
        <td>ID:</td>
        <td style="text-align: right">${requisitionSlip?.reference_number}</td>
      </tr>
      <tr>
        <td>Vendor:</td>
        <td style="text-align: right">${requisitionSlip?.vendor?.name}</td>
      </tr>
    
    </table>

    <br />

    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left">Product Name</th>
          <th style="text-align: center">Quantity</th>
        </tr>
        <tr>
          <td colspan="2" style="border-bottom: 1px solid black;"></td>
        </tr>
      </thead>
      <tbody>
        ${requisitionSlip.products
					.map(
						({ quantity, product }) => `
        <tr>
          <td>${product.name}</td>
          <td style="text-align: center">${formatQuantity(quantity, product)}</td>
        </tr>
        `,
					)
					.join('')}
      </tbody>
    </table>

    <br/>

    <table style="width: 100%;">
      <tr>
        <td>Print Details:</td>
        <td style="text-align: right">${dayjs().format('MM/DD/YYYY h:mmA')} ${user?.employee_id}</td>
      </tr>
    </table>
  </div>
`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Requisition Slip');
};
