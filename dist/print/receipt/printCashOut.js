"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashOut = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printCashOut = (cashOut, siteSettings, isPdf = false) => {
    const metadata = cashOut.cash_out_metadata;
    const { payee, particulars, received_by: receivedBy, prepared_by_user: preparedByUser, } = metadata;
    const datetime = (0, utils_1.formatDateTime)(cashOut.datetime_created);
    const amount = (0, utils_1.formatInPeso)(metadata.amount, helper_receipt_1.PESO_SIGN);
    const preparedBy = (0, utils_1.getFullName)(metadata.prepared_by_user);
    const approvedBy = (0, utils_1.getFullName)(metadata.approved_by_user);
    const branchMachine = cashOut.branch_machine;
    const data = `
	<div style="${(0, helper_receipt_1.getPageStyle)()}">
    ${(0, helper_receipt_1.getHeader)(siteSettings, branchMachine, 'DISBURSEMENT VOUCHER')}

		<br />

		<table style="width: 100%;">
			<thead>
				<tr>
					<th style="width: 130px"></th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>Payee:</td>
					<td>${payee}</td>
				</tr>
        <tr>
					<td>Particulars:</td>
					<td>${particulars}</td>
				</tr>
				<tr>
					<td>Amount:</td>
					<td>${amount}</td>
				</tr>
        <tr>
					<td>Received by:</td>
					<td>${receivedBy}</td>
				</tr>
				<tr>
					<td>Prepared by:</td>
					<td>${preparedBy}</td>
				</tr>
				<tr>
					<td>Approved by:</td>
					<td>${approvedBy}</td>
				</tr>
			</tbody>
		</table>

		<br />

    <div>GDT: ${datetime}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
    <div>${preparedByUser.employee_id}</div>

    <br />

    ${(0, helper_receipt_1.getFooter)(siteSettings)}
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Cash Out');
};
exports.printCashOut = printCashOut;
