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
			<td>{formatInPeso(report.gross_sales_for_the_day, PESO_SIGN)}</td>
			<td>{formatInPeso(report.sales_issue_with_manual, PESO_SIGN)}</td>
			<td>{formatInPeso(report.gross_sales_from_pos, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vatable_sales, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vat_amount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vat_exempt_sales, PESO_SIGN)}</td>
			<td>{formatInPeso(report.zero_rated_sales, PESO_SIGN)}</td>

			<td>{formatInPeso(report.regular_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.special_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(report.returns, PESO_SIGN)}</td>
			<td>{formatInPeso(report.void, PESO_SIGN)}</td>
			<td>{formatInPeso(report.total_deductions, PESO_SIGN)}</td>

			<td>{formatInPeso(report.vat_on_special_discounts, PESO_SIGN)}</td>
			<td>{formatInPeso(report.vat_on_returns, PESO_SIGN)}</td>
			<td>{formatInPeso(report.others, PESO_SIGN)}</td>
			<td>{formatInPeso(report.total_vat_adjusted, PESO_SIGN)}</td>

			<td>{formatInPeso(report.vat_payable, PESO_SIGN)}</td>
			<td>{formatInPeso(report.net_sales, PESO_SIGN)}</td>
			<td>{formatInPeso(report.other_income, PESO_SIGN)}</td>
			<td>{formatInPeso(report.sales_overrun_or_overflow, PESO_SIGN)}</td>
			<td>{formatInPeso(report.total_net_sales, PESO_SIGN)}</td>
			<td>{report.reset_counter}</td>
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
							<th rowSpan={2}>Date</th>
							<th rowSpan={2}>Beginning SI/OR No.</th>
							<th rowSpan={2}>Ending SI/OR No. </th>
							<th rowSpan={2}>Grand Accum. Sales Ending Balance</th>
							<th rowSpan={2}>Grand Accum. Sales Beginning Balance</th>
							<th rowSpan={2}>Gross Sales for the Day</th>
							<th rowSpan={2}>
								Sales Issued with Manual SI/OR (per RR 16-2018)
							</th>
							<th rowSpan={2}>Gross Sales From POS</th>
							<th rowSpan={2}>VATable Sales</th>
							<th rowSpan={2}>VAT Amount (12%)</th>
							<th rowSpan={2}>VAT-Exempt Sales</th>
							<th rowSpan={2}>Zero Rated Sales</th>
							<th colSpan={5}>Deductions</th>
							<th colSpan={4}>Adjustments on VAT</th>
							<th rowSpan={2}>VAT Payable</th>
							<th rowSpan={2}>Net Sales</th>
							<th rowSpan={2}>Other Income</th>
							<th rowSpan={2}>Sales Overrun/ Overflow</th>
							<th rowSpan={2}>Total Net Sales</th>
							<th rowSpan={2}>Reset Counter</th>
							<th rowSpan={2}>Remarks</th>
						</tr>
						<tr className="nested-row" style={{ fontWeight: 'bold' }}>
							<td>Regular Discount</td>
							<td>Special Discount</td>
							<td>Returns</td>
							<td>Void</td>
							<td>Total Deductions</td>
							<td>VAT on Specials</td>
							<td>VAT on Returns</td>
							<td>Others </td>
							<td>Total VAT Adj.</td>
						</tr>

						{rows}
					</table>
				</div>
			</body>
		</html>,
	);
};
