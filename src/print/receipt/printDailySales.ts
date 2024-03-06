import dayjs from 'dayjs';
import {
	BranchMachine,
	DailySales,
	GeneratedByUser,
	SiteSettings,
} from '../../types';
import { formatDate, formatDateTime, formatInPeso } from '../../utils';
import {
	EMPTY_CELL,
	PESO_SIGN,
	appendHtmlElement,
	getFooter,
	getHeader,
	getPageStyle,
	print,
} from '../helper-receipt';

export const printDailySales = (
	dailySales: DailySales,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	user: GeneratedByUser,
	isPdf = false,
) => {
	const data = `
	<div class="container" style="${getPageStyle()}">
    ${getHeader(siteSettings, branchMachine)}

    <br />

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>DAILY SALES</span>
			<span style="text-align: right;">For ${formatDate(
				dailySales.daily_sales_data.date,
			)}</span>
		</div>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>CASH SALES</td>
				<td style="text-align: right">${formatInPeso(
					dailySales.cash_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${formatInPeso(
					dailySales.credit_pay,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${formatInPeso(
					dailySales.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${formatInPeso(
					dailySales.vat_exempt,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_amount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
				<td>ZERO Rated</td>
				<td style="text-align: right">${formatInPeso(0, PESO_SIGN)}&nbsp;</td>
			</tr>
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>GROSS SALES</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.regular_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">Special</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.special_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.void,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.total_vat_adjusted,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td><b>NET SALES</b></td>
        <td style="text-align: right;"><b>${formatInPeso(
					dailySales.net_sales,
					PESO_SIGN,
				)}</b></td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>ADJUSTMENT ON VAT:</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">Special</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_special_discount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.others,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.total_vat_adjusted,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_amount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${formatInPeso(
					dailySales.total_vat_adjusted,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${formatInPeso(
					dailySales.vat_payable,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

    <br />

    <div>GDT: ${formatDate(dailySales.daily_sales_data.date)}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${dailySales.generated_by.employee_id || EMPTY_CELL}</span>
			<span>PB: ${user?.employee_id || EMPTY_CELL}</span>
		</div>

		<br />

		${getFooter(siteSettings)}
	</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Daily Sales');
};
