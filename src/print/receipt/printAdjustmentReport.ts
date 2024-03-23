import dayjs from 'dayjs';
import _ from 'lodash';
import { saleTypes, transactionStatuses } from '../../globals';
import { Transaction, User } from '../../types';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	getFullName,
	getTransactionStatusDescription,
} from '../../utils';
import { PESO_SIGN } from '../helper-receipt';

export const printAdjustmentReport = (
	transactions: Transaction[],
	user: User,
) => {
	const transactionReportRows = transactions
		.map((transaction, index) => {
			const backOrder = transaction.adjustment_remarks?.back_order;
			const newTransaction =
				transaction.adjustment_remarks?.new_updated_transaction;
			const discountOption = transaction.adjustment_remarks?.discount_option;

			const authorizers = [
				transaction.void_authorizer,
				transaction.discount_authorizer,
			].filter(Boolean);

			let remarks = '';
			if (backOrder) {
				remarks = `Back Order - ${backOrder.id}`;
			} else if (transaction.status === transactionStatuses.VOID_CANCELLED) {
				remarks = getTransactionStatusDescription(transaction.status);
			} else if (newTransaction) {
				remarks = `New Invoice - ${newTransaction.invoice.or_number}`;
			} else if (discountOption) {
				remarks = `
        <table style="margin-left: auto; margin-right: auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${discountOption.name}</td>
              <td>${_.upperFirst(discountOption.type)} ${
								discountOption?.percentage &&
								Number(discountOption.percentage) > 0
									? `${discountOption.percentage}%`
									: ''
							}</td>
              <td>${formatInPeso(transaction.overall_discount, PESO_SIGN)}</td>
            </tr>
          </tbody>
        </table>
        `;
			}

			const modeOfPayment =
				transaction.payment.mode === saleTypes.CASH ? 'Cash' : 'Charge';

			return `
    <tr>
      <td>${index + 1}</td>
      <td>${formatDate(transaction.invoice.datetime_created)}</td>
      <td>${transaction.invoice.or_number}</td>
      <td>${modeOfPayment}</td>
      <td>${
				transaction?.is_fully_paid ? 'Fully Paid' : 'Pending'
			} (${modeOfPayment})</td>
      <td>${remarks}</td>
      <td>${formatInPeso(transaction.total_amount, PESO_SIGN)}</td>
      <td>${getFullName(transaction.teller)}</td>
      <td>${authorizers
				.map(
					(authorizer) =>
						`<div>
          ${transaction.discount_authorizer === authorizer ? '(Discount) ' : ''}
						${transaction.void_authorizer === authorizer ? '(Void) ' : ''}
						${getFullName(authorizer)}
          </div>`,
				)
				.join('')}</td>
    </tr>
  `;
		})
		.join('');

	return `
	<html lang="en">
  <head>
    <style>
      body .adjustment-report-pdf * {
        font-family: Arial;
        font-size: 12px;
      }

      table.adjustment-report,
      div.details,
      .title {
        width: 1200px;
      }

      table.adjustment-report {
        border-collapse: collapse;
      }

      table.adjustment-report th,
      table.adjustment-report .nested-row td {
        min-width: 60px;
        line-height: 100%;
      }

      table.adjustment-report th[colspan] {
        background-color: #ADB9CA;
      }

      table.adjustment-report th[rowspan],
      table.adjustment-report .nested-row td {
        background-color: #BDD6EE;
      }

      table.adjustment-report th,
      table.adjustment-report td {
        border: 1px solid black;
        text-align: center;
      }

      .title {
        text-align: center;
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    <div class="adjustment-report-pdf">
			<div class="details">Printed Date: ${formatDateTime(dayjs())}</div>
      <div class="details">Printed By: ${getFullName(user)}</div>

      <br/>

      <h4 class="title">TRANSACTION ADJUSTMENTS REPORT</h4>
      <table class="adjustment-report">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Invoice Number</th>
            <th>Invoice Type</th>
            <th>Payment</th>
            <th>Remarks</th>
            <th>Total Amount</th>
            <th>Cashier</th>
            <th>Authorizer</th>
          </tr>
        </thead>

        <tbody>
        ${transactionReportRows}
        </tbody>
      </table>
    </div>
  </body>
  </html>
	`;
};
