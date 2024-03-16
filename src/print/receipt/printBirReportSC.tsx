import dayjs from 'dayjs';
import React from 'react';
import { BranchMachine, SiteSettings, Transaction, User } from '../../types';
import { formatDate, formatDateTime, formatInPeso } from '../../utils';
import { PESO_SIGN } from '../helper-receipt';
import ReactDOMServer from 'react-dom/server';

export const printBirReportSC = (
	transactions: Transaction[],
	siteSettings: SiteSettings,
	user: User,
	branchMachine?: BranchMachine,
) => {
	const birReportsRow = transactions.map((transaction) => (
		<tr>
			<td>{formatDate(transaction.datetime_created)}</td>

			<td>Manuel Ramirez</td>
			<td>14524-15</td>
			<td>123-123-123</td>
			<td>00-0123456789</td>

			<td>{formatInPeso(transaction.total_amount, PESO_SIGN)}</td>
			<td>{formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)}</td>
			<td>{formatInPeso(transaction.invoice.vat_exempt, PESO_SIGN)}</td>
			<td>{formatInPeso(0, PESO_SIGN)}</td>
			<td>{formatInPeso(transaction.overall_discount, PESO_SIGN)}</td>
			<td>{formatInPeso(transaction.invoice.vat_sales, PESO_SIGN)}</td>
		</tr>
	));

	const styles = `
    <style>
      body .bir-reports-pdf {
        font-family: 'Tahoma', monospace;
        font-size: 12px;
      }

      table.bir-reports,
      div.details,
      .title {
        width: 1780px;
      }

      table.bir-reports {
        border-collapse: collapse;
      }

      table.bir-reports th,
      table.bir-reports .nested-row td {
        min-width: 60px;
        line-height: 100%;
      }

      table.bir-reports th[colspan] {
        background-color: #ADB9CA;
      }

      table.bir-reports th[rowspan],
      table.bir-reports .nested-row td {
        background-color: #BDD6EE;
      }

      table.bir-reports th,
      table.bir-reports td {
        border: 1px solid black;
        text-align: center;
      }

      .title {
        text-align: center;
        font-weight: bold;
      }
    </style>`;

	return ReactDOMServer.renderToStaticMarkup(
		<html lang="en">
			<head>{styles}</head>

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

					<h4 className="title">Senior Citizen Sales Book/ Report</h4>

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
						${birReportsRow}
					</table>
				</div>
			</body>
		</html>,
	);
};
