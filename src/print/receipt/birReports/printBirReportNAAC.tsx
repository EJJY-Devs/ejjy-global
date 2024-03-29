import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import { formatDate, formatInPeso } from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import { BirHeader, birReportStyles } from './birReportHelper';

export const printBirReportNAAC = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = transactions.map((transaction) => (
		<tr>
			<td>{formatDate(transaction.datetime_created)}</td>

			<td>Chot Reyes</td>
			<td>14524-15</td>

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
						title="National Athletes and Coaches Sales Book/Report"
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
