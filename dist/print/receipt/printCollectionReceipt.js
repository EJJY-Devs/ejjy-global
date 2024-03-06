"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCollectionReceipt = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printCollectionReceipt = (collectionReceipt, siteSettings, branchMachine) => {
    var _a, _b, _c;
    const invoice = (_b = (_a = collectionReceipt.order_of_payment) === null || _a === void 0 ? void 0 : _a.charge_sales_transaction) === null || _b === void 0 ? void 0 : _b.invoice;
    const orderOfPayment = collectionReceipt.order_of_payment;
    const { payor, amount } = orderOfPayment;
    let description = orderOfPayment.extra_description;
    if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.FULL_PAYMENT) {
        description = 'Full Payment';
    }
    else if (orderOfPayment.purpose === globals_1.orderOfPaymentPurposes.PARTIAL_PAYMENT) {
        description = 'Partial Payment';
    }
    const data = `
  <div style="${(0, helper_receipt_1.getPageStyle)()}">
      ${(0, helper_receipt_1.getHeader)(siteSettings, branchMachine, 'COLLECTION RECEIPT')}

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
              <td>${(0, utils_1.getFullName)(payor)}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>${payor.home_address || helper_receipt_1.EMPTY_CELL}</td>
            </tr>
            <tr>
              <td>Tin:</td>
              <td>${payor.tin || helper_receipt_1.EMPTY_CELL}</td>
            </tr>
            <tr>
              <td>the sum of:</td>
              <td>${(0, utils_1.formatInPeso)(amount, helper_receipt_1.PESO_SIGN)}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>${description}</td>
            </tr>
            <tr>
              <td>with invoice:</td>
              <td>${(invoice === null || invoice === void 0 ? void 0 : invoice.or_number) || helper_receipt_1.EMPTY_CELL}</td>
            </tr>
          </tbody>
        </table>

        <br />

        ${collectionReceipt.check_number
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
                  <td>${collectionReceipt.bank_name || helper_receipt_1.EMPTY_CELL}</td>
                </tr>
                <tr>
                  <td>Branch:</td>
                  <td>${collectionReceipt.bank_branch || helper_receipt_1.EMPTY_CELL}</td>
                </tr>
                <tr>
                  <td>Check No:</td>
                  <td>${collectionReceipt.check_number || helper_receipt_1.EMPTY_CELL}</td>
                </tr>
                <tr>
                  <td>Check Date:</td>
                  <td>${collectionReceipt.check_date
            ? (0, utils_1.formatDate)(collectionReceipt.check_date)
            : helper_receipt_1.EMPTY_CELL}</td>
                </tr>
              </tbody>
            </table>
            <br />
          `
        : ''}

        <div>GDT: ${(0, utils_1.formatDateTime)(collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.datetime_created)}</div>
        <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
        <div style="display: flex; align-items: center; justify-content: space-between">
          <span>ID: ${(collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.id) || helper_receipt_1.EMPTY_CELL}</span>
          <span style="text-align: right;">${(_c = collectionReceipt === null || collectionReceipt === void 0 ? void 0 : collectionReceipt.created_by) === null || _c === void 0 ? void 0 : _c.employee_id}</span>
        </div>

        <br />

        ${(0, helper_receipt_1.getFooter)(siteSettings)}
        <div style="text-align: center; display: flex; flex-direction: column">
          <span>THIS DOCUMENT IS NOT VALID FOR CLAIMING INPUT TAXES.</span>
          <span>${(siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.thank_you_message) || helper_receipt_1.EMPTY_CELL}</span>
        </div>
      </div>
      `;
    (0, helper_receipt_1.print)(data, 'Collection Receipt');
};
exports.printCollectionReceipt = printCollectionReceipt;
