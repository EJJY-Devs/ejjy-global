import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import { formatDate } from '../../../utils';
import {
	BIR_REPORT_TITLES,
	BirHeader,
	birReportStyles,
	formatPesoCell,
	getBirNaacRows,
} from './birReportHelper';

export const printBirReportNAAC = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = getBirNaacRows(transactions).map((row) => (
		<tr>
			<td>{formatDate(row.date)}</td>

			<td>{row.coach}</td>
			<td>{row.id}</td>

			<td>{row.orNumber}</td>
			<td>{formatPesoCell(row.grossSales)}</td>
			<td>{formatPesoCell(row.discount)}</td>
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
						title={BIR_REPORT_TITLES.NAAC}
					/>

					<table className="bir-reports">
						<tr>
							<th>Date</th>
							<th>Name of National Athlete/Coach</th>
							<th>PNSTM ID No..</th>
							<th>SI / OR Number</th>
							<th>Gross Sales/Receipts</th>
							<th>Sales Discount (VAT+Disc)</th>
							<th>Net Sales</th>
						</tr>

						{rows}
					</table>
				</div>
			</body>
		</html>,
	);
};
