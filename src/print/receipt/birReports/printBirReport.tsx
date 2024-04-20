import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BirReport, BranchMachine, SiteSettings, User } from '../../../types';
import { formatDate, formatInPeso } from '../../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../../helper-receipt';
import { BirHeader, birReportStyles } from './birReportHelper';

export const printBirReport = (
	birReports: BirReport[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = birReports.map((report) => (
		<tr>
			<td>{formatDate(report.date)}</td>
			<td>{report?.beginning_or?.or_number || EMPTY_CELL}</td>
			<td>{report?.ending_or?.or_number || EMPTY_CELL}</td>

			<td>
				{formatInPeso(report.grand_accumulated_sales_ending_balance, PESO_SIGN)}
			</td>
			<td>
				{formatInPeso(
					report.grand_accumulated_sales_beginning_balance,
					PESO_SIGN,
				)}
			</td>
			<td>{formatInPeso(report.sales_issue_with_manual, PESO_SIGN)}</td>
			<td>{formatInPeso(report.gross_sales_for_the_day, PESO_SIGN)}</td>

			<td>{formatInPeso(report.vatable_sales, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vat_amount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vat_exempt_sales, PESO_SIGN)}</td>
			<td>{formatInPeso(report.zero_rated_sales, PESO_SIGN)}</td>

			<td>{formatInPeso(report.sc_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.pwd_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.naac_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.sp_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.others_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.returns, PESO_SIGN)}</td>
			<td>{formatInPeso(report.void, PESO_SIGN)}</td>
			<td>{formatInPeso(report.total_deductions, PESO_SIGN)}</td>

			<td>{formatInPeso(report.vat_sc_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vat_pwd_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vat_others_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vat_returns, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vat_others, PESO_SIGN)}</td>
			<td>{formatInPeso(report.total_vat_adjusted, PESO_SIGN)}</td>

			<td>{formatInPeso(report.vat_payable, PESO_SIGN)}</td>
			<td>{formatInPeso(report.net_sales, PESO_SIGN)}</td>
			<td>{formatInPeso(report.sales_overrun_or_overflow, PESO_SIGN)}</td>
			<td>{formatInPeso(report.total_income, PESO_SIGN)}</td>
			<td>{report.reset_counter}</td>
			<td>{report.z_counter}</td>
			<td>{report.remarks}</td>
		</tr>
	));

	return ReactDOMServer.renderToStaticMarkup(
		<html lang="en">
			<head>{birReportStyles}</head>

			<body>
				<div className="bir-reports-pdf">
					<BirHeader
						branchMachine={branchMachine}
						siteSettings={siteSettings}
						user={user}
						title="BIR SALES SUMMARY REPORT"
					/>

					<table className="bir-reports">
						<tr>
							<th rowSpan={3}>Date</th>
							<th rowSpan={3}>Beginning SI/OR No.</th>
							<th rowSpan={3}>Ending SI/OR No.</th>

							<th rowSpan={3}>Grand Accum. Sales Ending Balance</th>
							<th rowSpan={3}>Grand Accum. Sales Beg. Balance</th>
							<th rowSpan={3}>Sales Issued w/ Manual SI/OR (per RR 16-2018)</th>
							<th rowSpan={3}>Gross Sales for the Day</th>

							<th rowSpan={3}>VATable Sales</th>
							<th rowSpan={3}>VAT Amount</th>
							<th rowSpan={3}>VAT-Exempt Sales</th>
							<th rowSpan={3}>Zero Rated Sales</th>

							<th colSpan={8}>Deductions</th>
							<th colSpan={6}>Adjustments on VAT</th>

							<th rowSpan={3}>VAT Payable</th>
							<th rowSpan={3}>Net Sales</th>
							<th rowSpan={3}>Other Income</th>
							<th rowSpan={3}>Sales Overrun/ Overflow</th>
							<th rowSpan={3}>Total Net Sales</th>
							<th rowSpan={3}>Reset Counter</th>
							<th rowSpan={3}>Remarks</th>
						</tr>

						<tr className="nested-row">
							<th colSpan={5}>Discount</th>
							<th rowSpan={2}>Returns</th>
							<th rowSpan={2}>Void</th>
							<th rowSpan={2}>Total Deductions</th>

							<th colSpan={3}>Discount</th>
							<th rowSpan={2}>VAT on Returns</th>
							<th rowSpan={2}>Others</th>
							<th rowSpan={2}>Total VAT Adjustment</th>
						</tr>

						<tr className="nested-row">
							<td>SC</td>
							<td>PWD</td>
							<td>NAAC</td>
							<td>Solo Parent</td>
							<td>Others</td>
							<td>SC</td>
							<td>PWD</td>
							<td>Others</td>
						</tr>

						{rows}
					</table>
				</div>
			</body>
		</html>,
	);
};
