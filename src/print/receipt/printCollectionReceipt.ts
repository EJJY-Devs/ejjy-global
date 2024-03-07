import dayjs from 'dayjs';
import { orderOfPaymentPurposes } from '../../globals';
import { CollectionReceipt, SiteSettings } from '../../types';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	getFullName,
} from '../../utils';
import {
	EMPTY_CELL,
	PESO_SIGN,
	getFooter,
	getHeader,
	getPageStyle,
	print,
} from '../helper-receipt';

export const printCollectionReceipt = (
	collectionReceipt: CollectionReceipt,
	siteSettings: SiteSettings,
) => {
	const invoice =
		collectionReceipt.order_of_payment?.charge_sales_transaction?.invoice;
	const orderOfPayment = collectionReceipt.order_of_payment;
	const { payor, amount } = orderOfPayment;

	let description = orderOfPayment.extra_description;
	if (orderOfPayment.purpose === orderOfPaymentPurposes.FULL_PAYMENT) {
		description = 'Full Payment';
	} else if (
		orderOfPayment.purpose === orderOfPaymentPurposes.PARTIAL_PAYMENT
	) {
		description = 'Partial Payment';
	}

	const data = `
  <div style="${getPageStyle()}">
      ${getHeader(
				siteSettings,
				collectionReceipt.branch_machine,
				'COLLECTION RECEIPT',
			)}

      <br />

        <div style="text-align: center">Received payment from</div>

        <table style="width: 100%;">
          <thead>
            <tr>
              <th style="width: 130px"></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Name:</td>
              <td>${getFullName(payor)}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>${payor.home_address || EMPTY_CELL}</td>
            </tr>
            <tr>
              <td>Tin:</td>
              <td>${payor.tin || EMPTY_CELL}</td>
            </tr>
            <tr>
              <td>the sum of:</td>
              <td>${formatInPeso(amount, PESO_SIGN)}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>${description}</td>
            </tr>
            <tr>
              <td>with invoice:</td>
              <td>${invoice?.or_number || EMPTY_CELL}</td>
            </tr>
          </tbody>
        </table>

        <br />

        ${
					collectionReceipt.check_number
						? `
            <div>CHECK DETAILS</div>
            <table style="width: 100%;">
              <thead>
                <tr>
                  <th style="width: 130px"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bank:</td>
                  <td>${collectionReceipt.bank_name || EMPTY_CELL}</td>
                </tr>
                <tr>
                  <td>Branch:</td>
                  <td>${collectionReceipt.bank_branch || EMPTY_CELL}</td>
                </tr>
                <tr>
                  <td>Check No:</td>
                  <td>${collectionReceipt.check_number || EMPTY_CELL}</td>
                </tr>
                <tr>
                  <td>Check Date:</td>
                  <td>${
										collectionReceipt.check_date
											? formatDate(collectionReceipt.check_date)
											: EMPTY_CELL
									}</td>
                </tr>
              </tbody>
            </table>
            <br />
          `
						: ''
				}

        <div>GDT: ${formatDateTime(collectionReceipt?.datetime_created)}</div>
        <div>PDT: ${formatDateTime(dayjs(), false)}</div>
        <div style="display: flex; align-items: center; justify-content: space-between">
          <span>ID: ${collectionReceipt?.id || EMPTY_CELL}</span>
          <span style="text-align: right;">${
						collectionReceipt?.created_by?.employee_id
					}</span>
        </div>

        <br />

        ${getFooter(siteSettings)}
        <div style="text-align: center; display: flex; flex-direction: column">
          <span>THIS DOCUMENT IS NOT VALID FOR CLAIMING INPUT TAXES.</span>
          <span>${siteSettings?.thank_you_message || EMPTY_CELL}</span>
        </div>
      </div>
      `;

	print(data, 'Collection Receipt');
};
