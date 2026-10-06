import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BirReport, BranchMachine, SiteSettings, User } from '../../../types';
import { formatDate } from '../../../utils';
import {
	BIR_REPORT_TITLES,
	BirHeader,
	birReportStyles,
	formatPesoCell,
	getBirSalesSummaryRows,
	NO_TRANSACTION_REMARK,
} from './birReportHelper';

// Kept here (re-exported) because it is part of the package's public API.
export { NO_TRANSACTION_REMARK };

export const printBirReport = (
	birReports: BirReport[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = getBirSalesSummaryRows(birReports).map((row) => (
		<tr>
			<td>{formatDate(row.date)}</td>
			<td>{row.beginningOrNumber}</td>
			<td>{row.endingOrNumber}</td>
			<td>
				{formatPesoCell(row.amounts.grand_accumulated_sales_ending_balance)}
			</td>
			<td>
				{formatPesoCell(row.amounts.grand_accumulated_sales_beginning_balance)}
			</td>
			<td>{formatPesoCell(row.amounts.sales_issue_with_manual)}</td>
			<td>{formatPesoCell(row.amounts.gross_sales_for_the_day)}</td>
			<td>{formatPesoCell(row.amounts.vatable_sales)}</td>
			<td>{formatPesoCell(row.amounts.vat_amount)}</td>
			<td>{formatPesoCell(row.amounts.vat_exempt_sales)}</td>
			<td>{formatPesoCell(row.amounts.zero_rated_sales)}</td>
			<td>{formatPesoCell(row.amounts.sc_discount)}</td>
			<td>{formatPesoCell(row.amounts.pwd_discount)}</td>
			<td>{formatPesoCell(row.amounts.naac_discount)}</td>
			<td>{formatPesoCell(row.amounts.sp_discount)}</td>
			<td>{formatPesoCell(row.amounts.others_discount)}</td>
			<td>{formatPesoCell(row.amounts.returns)}</td>
			<td>{formatPesoCell(row.amounts.void)}</td>
			<td>{formatPesoCell(row.amounts.total_deductions)}</td>
			<td>{formatPesoCell(row.amounts.vat_sc_discount)}</td>
			<td>{formatPesoCell(row.amounts.vat_pwd_discount)}</td>
			<td>{formatPesoCell(row.amounts.vat_others_discount)}</td>
			<td>{formatPesoCell(row.amounts.vat_returns)}</td>
			<td>{formatPesoCell(row.amounts.vat_others)}</td>
			<td>{formatPesoCell(row.amounts.total_vat_adjusted)}</td>
			<td>{formatPesoCell(row.amounts.vat_payable)}</td>
			<td>{formatPesoCell(row.amounts.net_sales)}</td>
			<td>{formatPesoCell(row.amounts.sales_overrun_or_overflow)}</td>
			<td>{formatPesoCell(row.amounts.total_income)}</td>
			<td>{row.resetCounter}</td>
			<td>{row.zCounter}</td>
			<td>{row.remarks}</td>
		</tr>
	));

	return ReactDOMServer.renderToStaticMarkup(
		<html lang="en">
			<head>{birReportStyles('wide')}</head>

			<body>
				<div
					className="bir-reports-pdf"
					style={{ width: '100%', minWidth: 2000, maxWidth: 2300 }}
				>
					<BirHeader
						branchMachine={branchMachine}
						siteSettings={siteSettings}
						user={user}
						title={BIR_REPORT_TITLES.SALES_SUMMARY}
					/>

					<table className="bir-reports">
						<tr>
							<th rowSpan={3}>Date</th>
							<th rowSpan={3}>Beginning SI/OR No.</th>
							<th rowSpan={3}>Ending SI/OR No.</th>

							<th rowSpan={3}>Grand Accum. Sales Ending Balance</th>
							<th rowSpan={3}>Grand Accum. Sales Beg. Balance</th>
							<th rowSpan={3}>Sales Issued w/ Manual SI/OR (per RR 16-2018)</th>
							<th rowSpan={3}>Gross Sales of the Day</th>

							<th rowSpan={3}>VATable Sales</th>
							<th rowSpan={3}>VAT Amount</th>
							<th rowSpan={3}>VAT-Exempt Sales</th>
							<th rowSpan={3}>Zero Rated Sales</th>

							<th colSpan={8}>Deductions</th>
							<th colSpan={6}>Adjustments on VAT</th>

							<th rowSpan={3}>VAT Payable</th>
							<th rowSpan={3}>Net Sales</th>
							<th rowSpan={3}>Sales Overrun/Overflow</th>
							<th rowSpan={3}>Total Income</th>
							<th rowSpan={3}>Reset Counter</th>
							<th rowSpan={3}>Z-Counter</th>
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
