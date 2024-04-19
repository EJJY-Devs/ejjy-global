import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import {
	formatDate,
	formatInPeso,
	getDiscountFields,
	SCFields,
} from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import { BirHeader, birReportStyles } from './birReportHelper';
import { specialDiscountCodes } from '../../../globals';

export const printBirReportSC = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = transactions.map((transaction) => {
		const fields = getDiscountFields(
			specialDiscountCodes.SENIOR_CITIZEN,
			transaction.discount_option_additional_fields_values || '',
		) as SCFields;

		return (
			<tr>
				<td>{formatDate(transaction.datetime_created)}</td>

				<td>{fields.name}</td>
				<td>{fields.id}</td>
				<td>{fields.tin}</td>

				<td>{transaction.invoice.or_number}</td>
				<td>{formatInPeso(transaction.total_amount, PESO_SIGN)}</td>
				<td>{formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)}</td>
				<td>{formatInPeso(transaction.invoice.vat_exempt, PESO_SIGN)}</td>
				<td>{formatInPeso(0, PESO_SIGN)}</td>
				<td>{formatInPeso(transaction.overall_discount, PESO_SIGN)}</td>
				<td>{formatInPeso(transaction.invoice.vat_sales, PESO_SIGN)}</td>
			</tr>
		);
	});

	return ReactDOMServer.renderToStaticMarkup(
		<html lang="en">
			<head>{birReportStyles}</head>

			<body>
				<div className="bir-reports-pdf">
					<BirHeader
						branchMachine={branchMachine}
						siteSettings={siteSettings}
						user={user}
						title="Senior Citizen Sales Book/Report"
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
