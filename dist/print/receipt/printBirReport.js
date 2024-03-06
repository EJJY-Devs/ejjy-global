"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBirReport = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printBirReport = (birReports, siteSettings, branchMachine, user) => {
    const birReportsRow = birReports
        .map((report) => {
        var _a, _b;
        return `
    <tr>
      <td>${(0, utils_1.formatDate)(report.date)}</td>
      <td>${((_a = report === null || report === void 0 ? void 0 : report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL}</td>
      <td>${((_b = report === null || report === void 0 ? void 0 : report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || helper_receipt_1.EMPTY_CELL}</td>
      <td>${(0, utils_1.formatInPeso)(report.grand_accumulated_sales_ending_balance, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.grand_accumulated_sales_beginning_balance, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.gross_sales_for_the_day, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.sales_issue_with_manual, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.gross_sales_from_pos, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.vatable_sales, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.vat_exempt_sales, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.zero_rated_sales, helper_receipt_1.PESO_SIGN)}</td>

      <td>${(0, utils_1.formatInPeso)(report.regular_discount, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.special_discount, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.returns, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.void, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.total_deductions, helper_receipt_1.PESO_SIGN)}</td>

      <td>${(0, utils_1.formatInPeso)(report.vat_on_special_discounts, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.vat_on_returns, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.others, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN)}</td>

      <td>${(0, utils_1.formatInPeso)(report.vat_payable, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.net_sales, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.other_income, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.sales_overrun_or_overflow, helper_receipt_1.PESO_SIGN)}</td>
      <td>${(0, utils_1.formatInPeso)(report.total_net_sales, helper_receipt_1.PESO_SIGN)}</td>
      <td>${report.reset_counter}</td>
      <td>${report.remarks}</td>
    </tr>
  `;
    })
        .join('');
    return `
	<html lang="en">
  <head>
    <style>
      body .bir-reports-pdf {
        font-family: 'Tahoma', monospace;
        font-size: 12px;
      }

      table.bir-reports,
      div.details,
      .title {
        width: 1780px;
      }

      table.bir-reports {
        border-collapse: collapse;
      }

      table.bir-reports th,
      table.bir-reports .nested-row td {
        min-width: 60px;
        line-height: 100%;
      }

      table.bir-reports th[colspan] {
        background-color: #ADB9CA;
      }

      table.bir-reports th[rowspan],
      table.bir-reports .nested-row td {
        background-color: #BDD6EE;
      }

      table.bir-reports th,
      table.bir-reports td {
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
    <div class="bir-reports-pdf">
      <div class="details">${siteSettings.proprietor}</div>
      <div class="details" style="white-space: pre-line">${siteSettings.store_name}</div>
      <div class="details" style="white-space: pre-line">${siteSettings.address_of_tax_payer}</div>
      <div class="details">${siteSettings.tin} - ${branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.name}</div>
      <div class="details">POS Terminal</div>

      <br/>

      <h4 class="title">BIR SALES SUMMARY REPORT</h4>
      <table class="bir-reports">
        <tr>
          <th rowspan="2">Date</th>
          <th rowspan="2">Beginning SI/OR No.</th>
          <th rowspan="2">Ending SI/OR No. </th>
          <th rowspan="2">Grand Accum. Sales Ending Balance</th>
          <th rowspan="2">Grand Accum. Sales Beginning Balance</th>
          <th rowspan="2">Gross Sales for the Day</th>
          <th rowspan="2">Sales Issued with Manual SI/OR (per RR 16-2018)</th>
          <th rowspan="2">Gross Sales From POS</th>
          <th rowspan="2">VATable Sales</th>
          <th rowspan="2">VAT Amount (12%)</th>
          <th rowspan="2">VAT-Exempt Sales</th>
          <th rowspan="2">Zero Rated Sales</th>
          <th colspan="5">Deductions</th>
          <th colspan="4">Adjustments on VAT</th>
          <th rowspan="2">VAT Payable</th>
          <th rowspan="2">Net Sales</th>
          <th rowspan="2">Other Income</th>
          <th rowspan="2">Sales Overrun/ Overflow</th>
          <th rowspan="2">Total Net Sales</th>
          <th rowspan="2">Reset Counter</th>
          <th rowspan="2">Remarks</th>
        </tr>
        <tr class="nested-row" style="font-weight: bold">
          <td>Regular Discount</td>
          <td>Special (Special)</td>
          <td>Returns</td>
          <td>Void</td>
          <td>Total Deductions</td>
          <td>VAT on Specials</td>
          <td>VAT on Returns</td>
          <td>Others </td>
          <td>Total VAT Adj.</td>
        </tr>
        ${birReportsRow}
      </table>

      <br/>

      <div class="details">PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
      <div class="details">${user.employee_id}</div>
    </div>
  </body>
  </html>
	`;
};
exports.printBirReport = printBirReport;
