import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import { formatDate, formatInPeso } from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import { BirHeader, birReportStyles } from './birReportHelper';

export const printBirReportSP = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = transactions.map((transaction) => (
		<tr>
			<td>{formatDate(transaction.datetime_created)}</td>

			<td>Diana Paraiso</td>
			<td>14524-15</td>
			<td>Beth Paraiso</td>
			<td>10/15/2020</td>
			<td>4</td>

			<td>{transaction.invoice.or_number}</td>
			<td>{formatInPeso(transaction.gross_amount, PESO_SIGN)}</td>
			<td>{formatInPeso(transaction.overall_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(transaction.invoice.vat_sales, PESO_SIGN)}</td>
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
						title="Solo Parents Sales Book/Report"
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
