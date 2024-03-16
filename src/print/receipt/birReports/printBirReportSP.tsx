import dayjs from 'dayjs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import { formatDate, formatDateTime, formatInPeso } from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import { birReportStyles } from './birReportHelper';

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
					<div className="details">{siteSettings.proprietor}</div>
					<div className="details">{siteSettings.address_of_tax_payer}</div>
					<div className="details">{siteSettings.tin}</div>

					<br />

					<div className="details">V1.0 (Static)</div>
					<div className="details">{branchMachine?.pos_terminal}</div>
					<div className="details">{branchMachine?.name}</div>
					<div className="details">{formatDateTime(dayjs(), false)}</div>
					<div className="details">{user.employee_id}</div>

					<br />

					<h4 className="title">Solo Parents Sales Book/Report</h4>

					<table className="bir-reports">
						<tr>
							<th rowSpan={2}>Date</th>
							<th rowSpan={2}>Name of Solo Parent</th>
							<th rowSpan={2}>SPIC No.</th>
							<th rowSpan={2}>Name of child</th>
							<th rowSpan={2}>Birth Date of child</th>
							<th rowSpan={2}>Age of child</th>
							<th rowSpan={2}>SI / OR Number</th>
							<th rowSpan={2}>Gross Sales</th>
							<th rowSpan={2}>Discount (VAT+Disc)</th>
							<th rowSpan={2}>Net Sales</th>
						</tr>

						{rows}
					</table>
				</div>
			</body>
		</html>,
	);
};