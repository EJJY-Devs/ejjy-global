import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
import {
	formatDate,
	formatInPeso,
	getDiscountFields,
	SPFields,
} from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import { BirHeader, birReportStyles } from './birReportHelper';
import { specialDiscountCodes } from '../../../globals';

export const printBirReportSP = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const rows = transactions.map((transaction) => {
		const fields = getDiscountFields(
			specialDiscountCodes.SOLO_PARENTS,
			transaction.discount_option_additional_fields_values || '',
		) as SPFields;

		return (
			<tr>
				<td>{formatDate(transaction.datetime_created)}</td>

				<td>{fields.name}</td>
				<td>{fields.id}</td>
				<td>{fields.childName}</td>
				<td>{fields.childBirthdate}</td>
				<td>{fields.childAge}</td>

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
