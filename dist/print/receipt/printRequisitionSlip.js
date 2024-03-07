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
        <td style="text-align: right">${requisitionSlip.id}</td>
      </tr>
      <tr>
        <td>Requestor:</td>
        <td style="text-align: right">${(0, utils_1.getRequestor)(requisitionSlip)}</td>
      </tr>
    </table>

    <br />

    ${isPdf
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
            .map(({ quantity_piece, product }) => `
                <tr>
                  <td>
                    <span style="display:block">${product.name}</span>
                    <small>CODE: ${(0, utils_1.getProductCode)(product)}</small>
                  </td>

                  <td style="text-align: center">
                    ${(0, utils_1.formatQuantity)(quantity_piece, product)}
                  </td>

                  <td style="text-align: left">-</td>
                </tr>
              `)
            .join('')}
          </tbody>
        </table>
      `
        : `
        <table style="width: 100%;">
          ${requisitionSlip.products
            .map(({ quantity_piece, product }) => `
              <tr>
                <td colspan="2">${product.name}</td>
              </tr>
              <tr>
                <td style="padding-left: 4ch; width: 50%">
                ${(0, utils_1.formatQuantity)(quantity_piece, product)}</td>
                <td style="width: 50%">-</td>
              </tr>`)
            .join('')}
        </table>
        `}

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
