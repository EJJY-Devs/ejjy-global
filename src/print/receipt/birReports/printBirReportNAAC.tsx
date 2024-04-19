import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import {
	formatDate,
	formatInPeso,
	getDiscountFields,
	NaacFields,
} from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import { BirHeader, birReportStyles } from './birReportHelper';
import { specialDiscountCodes } from '../../../globals';

export const printBirReportNAAC = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = transactions.map((transaction) => {
		const fields = getDiscountFields(
			specialDiscountCodes.NATIONAL_ATHLETES_AND_COACHES,
			transaction.discount_option_additional_fields_values || '',
		) as NaacFields;

		return (
			<tr>
				<td>{formatDate(transaction.datetime_created)}</td>

				<td>{fields.coach}</td>
				<td>{fields.id}</td>

				<td>{transaction.invoice.or_number}</td>
				<td>{formatInPeso(transaction.gross_amount, PESO_SIGN)}</td>
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
