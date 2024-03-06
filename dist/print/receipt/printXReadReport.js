"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printXReadReport = void 0;
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printXReadReport = (report, siteSettings, branchMachine, user, isPdf = false) => {
    var _a, _b, _c, _d;
    const data = `
	<div class="container" style="${(0, helper_receipt_1.getPageStyle)()}">
  ${(0, helper_receipt_1.getHeader)(siteSettings, branchMachine)}

    <br />

    ${(report === null || report === void 0 ? void 0 : report.gross_sales) === 0
        ? '<div style="text-align: center">NO TRANSACTION</div>'
        : ''}

    <br/>

		<div>X-READ</div>
    <br/>

    <div>INVOICE NUMBER</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg Invoice #:</td>
        <td style="text-align: right">${((_a = report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL}</td>
      </tr>
      <tr>
      <td style="width: 120px;">End Invoice #:</td>
        <td style="text-align: right">${((_b = report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || helper_receipt_1.EMPTY_CELL}</td>
      </tr>
    </table>

    <div>SALES</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.beginning_sales, helper_receipt_1.PESO_SIGN)}</td>
      </tr>
      <tr>
        <td style="width: 120px;">Cur:</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN)}</td>
      </tr>
        <td style="width: 120px;">End:</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.ending_sales, helper_receipt_1.PESO_SIGN)}</td>
      </tr>
    </table>

    <div>TRANSACTION COUNT</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right">${report.beginning_transactions_count}</td>
      </tr>
      <tr>
        <td style="width: 120px;">Cur:</td>
        <td style="text-align: right">${report.total_transactions}</td>
      </tr>
        <td style="width: 120px;">End:</td>
        <td style="text-align: right">${report.ending_transactions_count}</td>
      </tr>
    </table>

		<br />

    <div style="text-align: center;">CURRENT SALES BREAKDOWN</div>

    <br/>

		<table style="width: 100%;">
			<tr>
				<td>CASH SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(report.cash_sales, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${(0, helper_receipt_1.formatInPesoWithUnderline)(report.credit_pay)}&nbsp;
        ${(0, helper_receipt_1.addUnderline)(report.credit_pay)}</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_exempt, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
			</tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_sales, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
				<td>ZERO Rated</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>GROSS SALES</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.gross_sales, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(report.regular_discount, helper_receipt_1.PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">Special</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(report.special_discount, helper_receipt_1.PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(report.void, helper_receipt_1.PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${(0, helper_receipt_1.formatInPesoWithUnderline)(report.total_vat_adjusted)})${(0, helper_receipt_1.addUnderline)(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td><b>NET SALES</b></td>
        <td style="text-align: right;"><b>${(0, utils_1.formatInPeso)(report.net_sales, helper_receipt_1.PESO_SIGN)}</b>&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>ADJUSTMENT ON VAT:</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">Special</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_special_discount, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${(0, helper_receipt_1.formatInPesoWithUnderline)(report.others)}&nbsp;${(0, helper_receipt_1.addUnderline)(report.others)}</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${(0, helper_receipt_1.formatInPesoWithUnderline)(report.total_vat_adjusted)})${(0, helper_receipt_1.addUnderline)(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(report.vat_payable, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

    <br />

		<div>GDT: ${report.generation_datetime
        ? (0, utils_1.formatDateTime)(report.generation_datetime)
        : helper_receipt_1.EMPTY_CELL}</div>
    <div>PDT: ${report.printing_datetime
        ? (0, utils_1.formatDateTime)(report.printing_datetime)
        : helper_receipt_1.EMPTY_CELL}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${((_c = report === null || report === void 0 ? void 0 : report.generated_by) === null || _c === void 0 ? void 0 : _c.employee_id) || helper_receipt_1.EMPTY_CELL}</span>
			<span>PB: ${(user === null || user === void 0 ? void 0 : user.employee_id) || ((_d = report === null || report === void 0 ? void 0 : report.generated_by) === null || _d === void 0 ? void 0 : _d.employee_id) || helper_receipt_1.EMPTY_CELL}</span>
		</div>

		<br />

		${(0, helper_receipt_1.getFooter)(siteSettings)}
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'XRead Report');
};
exports.printXReadReport = printXReadReport;
