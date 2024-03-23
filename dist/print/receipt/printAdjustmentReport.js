"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printAdjustmentReport = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = __importDefault(require("lodash"));
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printAdjustmentReport = (transactions, user) => {
    const transactionReportRows = transactions
        .map((transaction, index) => {
        var _a, _b, _c;
        const backOrder = (_a = transaction.adjustment_remarks) === null || _a === void 0 ? void 0 : _a.back_order;
        const newTransaction = (_b = transaction.adjustment_remarks) === null || _b === void 0 ? void 0 : _b.new_updated_transaction;
        const discountOption = (_c = transaction.adjustment_remarks) === null || _c === void 0 ? void 0 : _c.discount_option;
        const authorizers = [
            transaction.void_authorizer,
            transaction.discount_authorizer,
        ].filter(Boolean);
        let remarks = '';
        if (backOrder) {
            remarks = `Back Order - ${backOrder.id}`;
        }
        else if (transaction.status === globals_1.transactionStatuses.VOID_CANCELLED) {
            remarks = (0, utils_1.getTransactionStatusDescription)(transaction.status);
        }
        else if (newTransaction) {
            remarks = `New Invoice - ${newTransaction.invoice.or_number}`;
        }
        else if (discountOption) {
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
              <td>${lodash_1.default.upperFirst(discountOption.type)} ${(discountOption === null || discountOption === void 0 ? void 0 : discountOption.percentage) &&
                Number(discountOption.percentage) > 0
                ? `${discountOption.percentage}%`
                : ''}</td>
              <td>${(0, utils_1.formatInPeso)(transaction.overall_discount, helper_receipt_1.PESO_SIGN)}</td>
            </tr>
          </tbody>
        </table>
        `;
        }
        const modeOfPayment = transaction.payment.mode === globals_1.saleTypes.CASH ? 'Cash' : 'Charge';
        return `
    <tr>
      <td>${index + 1}</td>
      <td>${(0, utils_1.formatDate)(transaction.invoice.datetime_created)}</td>
      <td>${transaction.invoice.or_number}</td>
      <td>${modeOfPayment}</td>
      <td>${(transaction === null || transaction === void 0 ? void 0 : transaction.is_fully_paid) ? 'Fully Paid' : 'Pending'} (${modeOfPayment})</td>
      <td>${remarks}</td>
      <td>${(0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.getFullName)(transaction.teller)}</td>
      <td>${authorizers
            .map((authorizer) => `<div>
          ${transaction.discount_authorizer === authorizer ? '(Discount) ' : ''}
						${transaction.void_authorizer === authorizer ? '(Void) ' : ''}
						${(0, utils_1.getFullName)(authorizer)}
          </div>`)
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
			<div class="details">Printed Date: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)())}</div>
      <div class="details">Printed By: ${(0, utils_1.getFullName)(user)}</div>

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
exports.printAdjustmentReport = printAdjustmentReport;
