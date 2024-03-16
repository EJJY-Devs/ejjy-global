import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import { formatDate, formatInPeso } from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import { BirHeader, birReportStyles } from './birReportHelper';

export const printBirReportPWD = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = transactions.map((transaction) => (
		<tr>
			<td>{formatDate(transaction.datetime_created)}</td>

			<td>Mark Angeles</td>
			<td>14524-15</td>
			<td>123-123-123</td>

			<td>{transaction.invoice.or_number}</td>
			<td>{formatInPeso(transaction.total_amount, PESO_SIGN)}</td>
			<td>{formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)}</td>
			<td>{formatInPeso(transaction.invoice.vat_exempt, PESO_SIGN)}</td>
			<td>{formatInPeso(0, PESO_SIGN)}</td>
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
						title="Persons with Disability Sales Book/Report"
					/>

					<table className="bir-reports">
						<tr>
							<th rowSpan={2}>Date</th>
							<th rowSpan={2}>Name of Person with Disability (PWD)</th>
							<th rowSpan={2}>PWD ID No.</th>
							<th rowSpan={2}>PWD TIN</th>
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
