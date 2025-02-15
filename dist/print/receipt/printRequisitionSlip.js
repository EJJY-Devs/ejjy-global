"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRequisitionSlip = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printRequisitionSlip = (requisitionSlip, siteSettings, user, isPdf = false) => {
    const data = `
  <div class="container" style="${(0, helper_receipt_1.getPageStyle)()}">
  ${(0, helper_receipt_1.getHeader)(siteSettings, undefined, 'REQUISITION SLIP')}

    <br />

    <table style="width: 100%;">
      <tr>
        <td>Date & Time Requested:</td>
        <td style="text-align: right">${(0, utils_1.formatDateTime)(requisitionSlip.datetime_created)}</td>
      </tr>
      <tr>
        <td>F-RS1:</td>
        <td style="text-align: right">${(0, utils_1.formatRequisitionSlipId)(requisitionSlip.id)}</td>
      </tr>
      <tr>
        <td>Requestor:</td>
        <td style="text-align: right">${(0, utils_1.getRequestor)(requisitionSlip)}</td>
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
        .map(({ quantity_piece, product }) => `
          <tr>
            <td>${product.name}</td>
            <td>${(0, utils_1.getProductCode)(product)}</td>
            <td style="text-align: center">${(0, utils_1.formatQuantity)(quantity_piece, product)}</td>
          </tr>
        `)
        .join('')}
      </tbody>
    </table>

    <br/>

    <table style="width: 100%;">
      <tr>
        <td>Date & Time Printed:</td>
        <td style="text-align: right">${(0, dayjs_1.default)().format('MM/DD/YYYY h:mmA')}</td>
      </tr>
      <tr>
        <td>Printed By:</td>
        <td style="text-align: right">${(0, utils_1.getFullName)(user)}</td>
      </tr>
    </table>
  </div>
`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Requisition Slip');
};
exports.printRequisitionSlip = printRequisitionSlip;
