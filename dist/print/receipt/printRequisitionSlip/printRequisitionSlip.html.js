"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRequisitionSlipHtml = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const printRequisitionSlipHtml = ({ requisitionSlip, siteSettings, user, isPdf = false, }) => {
    var _a, _b;
    const data = `
        <div className="container" style="${(0, helper_receipt_1.getPageStyle)()}">
  ${(0, helper_receipt_1.getHeader)(siteSettings, undefined, 'REQUISITION SLIP', requisitionSlip.branch)}

    <br />

    <table style="width: 100%;">
      <tr>
        <td>Date & Time Requested:</td>
        <td style="text-align: right">${(0, utils_1.formatDateTime)(requisitionSlip.datetime_created)}</td>
      </tr>
      <tr>
        <td>Requestor:</td>
        <td style="text-align: right">${(0, utils_1.getFullName)(requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.approved_by)}</td>
      </tr>
      <tr>
        <td>Customer:</td>
        <td style="text-align: right">${(_a = requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.branch) === null || _a === void 0 ? void 0 : _a.name}</td>
      </tr>
      <tr>
        <td>ID:</td>
        <td style="text-align: right">${requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.reference_number}</td>
      </tr>
      <tr>
        <td>Vendor:</td>
        <td style="text-align: right">${(_b = requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.vendor) === null || _b === void 0 ? void 0 : _b.name}</td>
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
        .map(({ quantity, product }) => `
        <tr>
          <td>${product.name}</td>
          <td style="text-align: center">${(0, utils_1.formatQuantity)(quantity, product)}</td>
        </tr>
        `)
        .join('')}
      </tbody>
    </table>

    <br/>

    <table style="width: 100%;">
      <tr>
        <td>Print Details:</td>
        <td style="text-align: right">${(0, dayjs_1.default)().format('MM/DD/YYYY h:mmA')} ${user === null || user === void 0 ? void 0 : user.employee_id}</td>
      </tr>
    </table>
  </div>
`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Requisition Slip');
};
exports.printRequisitionSlipHtml = printRequisitionSlipHtml;
