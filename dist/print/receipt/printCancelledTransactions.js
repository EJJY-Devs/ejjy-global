"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCancelledTransactions = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printCancelledTransactions = (amount, filterRange, filterStatus, siteSettings, transactions, user, onComplete) => {
    var _a;
    const branchMachine = (_a = transactions === null || transactions === void 0 ? void 0 : transactions[0]) === null || _a === void 0 ? void 0 : _a.branch_machine;
    const data = `
	<div style="${(0, helper_receipt_1.getPageStyle)()}">
		<style>
			td {
				padding-top: 0;
				padding-bottom: 0;
				line-height: 100%;
			}
		</style>

		${(0, helper_receipt_1.getHeader)(siteSettings, branchMachine)}

		<br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Status:</span>
			<span style="text-align: right;">${(0, utils_1.getTransactionStatusDescription)(filterStatus)}</span>
		</div>
		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Date Range:</span>
			<span style="text-align: right;">AS OF ${(0, dayjs_1.default)().format(globals_1.DATE_FORMAT)}</span>
		</div>
		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>Date of Printing:</span>
			<span style="text-align: right;">${filterRange}</span>
		</div>

		<br />

		<table style="width: 100%;">
			${transactions
        .map((transaction) => {
        var _a;
        return `
					<tr>
						<td>${((_a = transaction === null || transaction === void 0 ? void 0 : transaction.invoice) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL}</td>
						<td style="text-align: right">
							${(0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN)}
						</td>
					</tr>`;
    })
        .join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>TOTAL</span>
			<span>${(0, utils_1.formatInPeso)(amount, helper_receipt_1.PESO_SIGN)}</span>
		</div>

		<br />

    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>
    <div>${user.employee_id}</div>

    <br />

    ${(0, helper_receipt_1.getFooter)(siteSettings)}

	</div>
	`;
    (0, helper_receipt_1.print)(data, 'Transactions', onComplete);
};
exports.printCancelledTransactions = printCancelledTransactions;
