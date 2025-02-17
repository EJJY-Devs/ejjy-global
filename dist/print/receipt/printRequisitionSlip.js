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
 	<div className="container" style="${(0, helper_receipt_1.getPageStyle)()}">
  ${(0, helper_receipt_1.getHeader)(siteSettings, undefined, 'REQUISITION SLIP')}

    <br />

    <table style="width: 100%;">
      <tr>
        <td>Date & Time Requested:</td>
        <td style="text-align: right">${(0, utils_1.formatDateTime)(requisitionSlip.datetime_created)}</td>
      </tr>
      <tr>
        <td>ID:</td>
        <td style="text-align: right">${(0, utils_1.formatRequisitionSlipId)(requisitionSlip.id)}</td>
      </tr>
      <tr>
        <td>Requestor:</td>
        <td style="text-align: right">${(0, utils_1.getFullName)(requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.prepared_by)}</td>
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
        .map(({ quantity, product }) => `
          <tr>
            <td>${product.name}</td>
            <td style="text-align: right">${(0, utils_1.formatQuantity)(quantity, product)}</td>
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
