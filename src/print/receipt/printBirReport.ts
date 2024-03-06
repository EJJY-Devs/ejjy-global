import dayjs from 'dayjs';
import { BirReport, BranchMachine, SiteSettings, User } from '../../types';
import { formatDate, formatDateTime, formatInPeso } from '../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../helper-receipt';

export const printBirReport = (
	birReports: BirReport[],
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	user: User,
) => {
	const birReportsRow = birReports
		.map(
			(report) => `
    <tr>
      <td>${formatDate(report.date)}</td>
      <td>${report?.beginning_or?.or_number || EMPTY_CELL}</td>
      <td>${report?.ending_or?.or_number || EMPTY_CELL}</td>
      <td>${formatInPeso(
				report.grand_accumulated_sales_ending_balance,
				PESO_SIGN,
			)}</td>
      <td>${formatInPeso(
				report.grand_accumulated_sales_beginning_balance,
				PESO_SIGN,
			)}</td>
      <td>${formatInPeso(report.gross_sales_for_the_day, PESO_SIGN)}</td>
      <td>${formatInPeso(report.sales_issue_with_manual, PESO_SIGN)}</td>
      <td>${formatInPeso(report.gross_sales_from_pos, PESO_SIGN)}</td>
      <td>${formatInPeso(report.vatable_sales, PESO_SIGN)}</td>
      <td>${formatInPeso(report.vat_amount, PESO_SIGN)}</td>
      <td>${formatInPeso(report.vat_exempt_sales, PESO_SIGN)}</td>
      <td>${formatInPeso(report.zero_rated_sales, PESO_SIGN)}</td>

      <td>${formatInPeso(report.regular_discount, PESO_SIGN)}</td>
      <td>${formatInPeso(report.special_discount, PESO_SIGN)}</td>
      <td>${formatInPeso(report.returns, PESO_SIGN)}</td>
      <td>${formatInPeso(report.void, PESO_SIGN)}</td>
      <td>${formatInPeso(report.total_deductions, PESO_SIGN)}</td>

      <td>${formatInPeso(report.vat_on_special_discounts, PESO_SIGN)}</td>
      <td>${formatInPeso(report.vat_on_returns, PESO_SIGN)}</td>
      <td>${formatInPeso(report.others, PESO_SIGN)}</td>
      <td>${formatInPeso(report.total_vat_adjusted, PESO_SIGN)}</td>

      <td>${formatInPeso(report.vat_payable, PESO_SIGN)}</td>
      <td>${formatInPeso(report.net_sales, PESO_SIGN)}</td>
      <td>${formatInPeso(report.other_income, PESO_SIGN)}</td>
      <td>${formatInPeso(report.sales_overrun_or_overflow, PESO_SIGN)}</td>
      <td>${formatInPeso(report.total_net_sales, PESO_SIGN)}</td>
      <td>${report.reset_counter}</td>
      <td>${report.remarks}</td>
    </tr>
  `,
		)
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
      <div class="details" style="white-space: pre-line">${
				siteSettings.store_name
			}</div>
      <div class="details" style="white-space: pre-line">${
				siteSettings.address_of_tax_payer
			}</div>
      <div class="details">${siteSettings.tin} - ${branchMachine?.name}</div>
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

      <div class="details">PDT: ${formatDateTime(dayjs(), false)}</div>
      <div class="details">${user.employee_id}</div>
    </div>
  </body>
  </html>
	`;
};
