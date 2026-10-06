import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import { formatDate } from '../../../utils';
import {
	BIR_REPORT_TITLES,
	BirHeader,
	birReportStyles,
	formatPesoCell,
	getBirSoloParentRows,
} from './birReportHelper';

export const printBirReportSP = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = getBirSoloParentRows(transactions).map((row) => (
		<tr>
			<td>{formatDate(row.date)}</td>

			<td>{row.name}</td>
			<td>{row.id}</td>
			<td>{row.childName}</td>
			<td>{row.childBirthdate}</td>
			<td>{row.childAge}</td>

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
						title={BIR_REPORT_TITLES.SP}
					/>

					<table className="bir-reports">
						<tr>
							<th>Date</th>
							<th>Name of Solo Parent</th>
							<th>SPIC No.</th>
							<th>Name of child</th>
							<th>Birth Date of child</th>
							<th>Age of child</th>
							<th>SI / OR Number</th>
							<th>Gross Sales</th>
							<th>Discount (VAT+Disc)</th>
							<th>Net Sales</th>
						</tr>

						{rows}
					</table>
				</div>
			</body>
		</html>,
	);
};
