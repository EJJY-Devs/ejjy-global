import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import { formatDate } from '../../../utils';
import {
	BIR_REPORT_TITLES,
	BirHeader,
	birReportStyles,
	formatPesoCell,
	getBirSeniorRows,
} from './birReportHelper';

export const printBirReportSC = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = getBirSeniorRows(transactions).map((row) => (
		<tr>
			<td>{formatDate(row.date)}</td>

			<td>{row.name}</td>
			<td>{row.id}</td>
			<td>{row.tin}</td>

			<td>{row.orNumber}</td>
			<td>{formatPesoCell(row.sales)}</td>
			<td>{formatPesoCell(row.vatAmount)}</td>
			<td>{formatPesoCell(row.vatExempt)}</td>
			<td>{formatPesoCell(row.deduction5Percent)}</td>
			<td>{formatPesoCell(row.deduction20Percent)}</td>
			<td>{formatPesoCell(row.netSales)}</td>
		</tr>
	));

	return ReactDOMServer.renderToStaticMarkup(
		<html lang="en">
			<head>{birReportStyles('compact')}</head>

			<body>
				<div className="bir-reports-pdf" style={{ width: '100%' }}>
					<BirHeader
						branchMachine={branchMachine}
						siteSettings={siteSettings}
						user={user}
						title={BIR_REPORT_TITLES.SC}
					/>

					<table className="bir-reports">
						<tr>
							<th rowSpan={2}>Date</th>
							<th rowSpan={2}>Name of Senior Citizen (SC)</th>
							<th rowSpan={2}>OSCA ID No./ SC ID No.</th>
							<th rowSpan={2}>SC TIN</th>
							<th rowSpan={2}>SI / OR Number</th>
							<th rowSpan={2}>Sales (inclusive of VAT)</th>
							<th rowSpan={2}>VAT Amount</th>
							<th rowSpan={2}>VAT Exempt Sales</th>
							<th colSpan={2}>Deductions</th>
							<th rowSpan={2}>Net Sales</th>
						</tr>
						<tr className="nested-row" style={{ fontWeight: 'bold' }}>
							<td>5%</td>
							<td>20%</td>
						</tr>

						{rows}
					</table>
				</div>
			</body>
		</html>,
	);
};
