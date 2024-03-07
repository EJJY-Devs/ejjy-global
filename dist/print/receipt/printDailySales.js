"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDailySales = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printDailySales = (dailySales, siteSettings, user, isPdf = false) => {
    const data = `
	<div class="container" style="${(0, helper_receipt_1.getPageStyle)()}">
    ${(0, helper_receipt_1.getHeader)(siteSettings, dailySales.branch_machine)}

    <br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>DAILY SALES</span>
			<span style="text-align: right;">For ${(0, utils_1.formatDate)(dailySales.daily_sales_data.date)}</span>
		</div>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>CASH SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.cash_sales, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.credit_pay, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.gross_sales, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_exempt, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
			</tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_sales, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_amount, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
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
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.gross_sales, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.regular_discount, helper_receipt_1.PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">Special</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.special_discount, helper_receipt_1.PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.void, helper_receipt_1.PESO_SIGN)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN)})</td>
      </tr>
      <tr>
        <td><b>NET SALES</b></td>
        <td style="text-align: right;"><b>${(0, utils_1.formatInPeso)(dailySales.net_sales, helper_receipt_1.PESO_SIGN)}</b></td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>ADJUSTMENT ON VAT:</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">Special</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_special_discount, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.others, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_amount, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${(0, utils_1.formatInPeso)(dailySales.total_vat_adjusted, helper_receipt_1.PESO_SIGN)})</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${(0, utils_1.formatInPeso)(dailySales.vat_payable, helper_receipt_1.PESO_SIGN)}&nbsp;</td>
      </tr>
    </table>

    <br />

    <div>GDT: ${(0, utils_1.formatDate)(dailySales.daily_sales_data.date)}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${dailySales.generated_by.employee_id || helper_receipt_1.EMPTY_CELL}</span>
			<span>PB: ${(user === null || user === void 0 ? void 0 : user.employee_id) || helper_receipt_1.EMPTY_CELL}</span>
		</div>

		<br />

		${(0, helper_receipt_1.getFooter)(siteSettings)}
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Daily Sales');
};
exports.printDailySales = printDailySales;
