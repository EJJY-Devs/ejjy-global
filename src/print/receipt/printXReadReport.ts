import {
	BranchMachine,
	GeneratedByUser,
	SiteSettings,
	XReadReport,
} from '../../types';
import { formatDateTime, formatInPeso } from '../../utils';
import {
	EMPTY_CELL,
	PESO_SIGN,
	addUnderline,
	appendHtmlElement,
	formatInPesoWithUnderline,
	getFooter,
	getHeader,
	getPageStyle,
	print,
} from '../helper-receipt';

export const printXReadReport = (
	report: XReadReport,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	user: GeneratedByUser,
	isPdf = false,
) => {
	const data = `
	<div class="container" style="${getPageStyle()}">
  ${getHeader(siteSettings, branchMachine)}

    <br />

    ${
			report?.gross_sales === 0
				? '<div style="text-align: center">NO TRANSACTION</div>'
				: ''
		}

    <br/>

		<div>X-READ</div>
    <br/>

    <div>INVOICE NUMBER</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg Invoice #:</td>
        <td style="text-align: right">${
					report.beginning_or?.or_number || EMPTY_CELL
				}</td>
      </tr>
      <tr>
      <td style="width: 120px;">End Invoice #:</td>
        <td style="text-align: right">${
					report.ending_or?.or_number || EMPTY_CELL
				}</td>
      </tr>
    </table>

    <div>SALES</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right">${formatInPeso(
					report.beginning_sales,
					PESO_SIGN,
				)}</td>
      </tr>
      <tr>
        <td style="width: 120px;">Cur:</td>
        <td style="text-align: right">${formatInPeso(
					report.gross_sales,
					PESO_SIGN,
				)}</td>
      </tr>
        <td style="width: 120px;">End:</td>
        <td style="text-align: right">${formatInPeso(
					report.ending_sales,
					PESO_SIGN,
				)}</td>
      </tr>
    </table>

    <div>TRANSACTION COUNT</div>
    <table style="margin-left: 15px;">
      <tr>
        <td style="width: 120px;">Beg:</td>
        <td style="text-align: right">${
					report.beginning_transactions_count
				}</td>
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
				<td style="text-align: right">${formatInPeso(
					report.cash_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
			<tr>
				<td>CREDIT SALES</td>
				<td style="text-align: right">${formatInPesoWithUnderline(
					report.credit_pay,
				)}&nbsp;
        ${addUnderline(report.credit_pay)}</td>
			</tr>
			<tr>
				<td>GROSS SALES</td>
				<td style="text-align: right">${formatInPeso(
					report.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
		</table>

		<br />

		<table style="width: 100%;">
			<tr>
				<td>VAT Exempt</td>
				<td style="text-align: right">${formatInPeso(
					report.vat_exempt,
					PESO_SIGN,
				)}&nbsp;</td>
			</tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_amount,
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
					report.gross_sales,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">REG. DISCOUNT</td>
        <td style="text-align: right">(${formatInPeso(
					report.regular_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">Special</td>
        <td style="text-align: right">(${formatInPeso(
					report.special_discount,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VOIDED SALES</td>
        <td style="text-align: right">(${formatInPeso(
					report.void,
					PESO_SIGN,
				)})</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">VAT AMOUNT (12%)</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(
					report.total_vat_adjusted,
				)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td><b>NET SALES</b></td>
        <td style="text-align: right;"><b>${formatInPeso(
					report.net_sales,
					PESO_SIGN,
				)}</b>&nbsp;</td>
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
					report.vat_special_discount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">OTHERS</td>
        <td style="text-align: right">${formatInPesoWithUnderline(
					report.others,
				)}&nbsp;${addUnderline(report.others)}</td>
      </tr>
      <tr>
        <td style="padding-left: 15px">TOTAL</td>
        <td style="text-align: right">${formatInPeso(
					report.total_vat_adjusted,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

    <div style="width: 100%; text-align: right">----------------</div>

    <table style="width: 100%;">
      <tr>
        <td>VAT AMOUNT (12%)</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_amount,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
      <tr>
        <td>VAT ADJ.</td>
        <td style="text-align: right">(${formatInPesoWithUnderline(
					report.total_vat_adjusted,
				)})${addUnderline(report.total_vat_adjusted)}</td>
      </tr>
      <tr>
        <td>VAT PAYABLE</td>
        <td style="text-align: right">${formatInPeso(
					report.vat_payable,
					PESO_SIGN,
				)}&nbsp;</td>
      </tr>
    </table>

    <br />

		<div>GDT: ${
			report.generation_datetime
				? formatDateTime(report.generation_datetime)
				: EMPTY_CELL
		}</div>
    <div>PDT: ${
			report.printing_datetime
				? formatDateTime(report.printing_datetime)
				: EMPTY_CELL
		}</div>

    <div style="display: flex; align-items: center; justify-content: space-between">
			<span>C: ${report?.generated_by?.employee_id || EMPTY_CELL}</span>
			<span>PB: ${
				user?.employee_id || report?.generated_by?.employee_id || EMPTY_CELL
			}</span>
		</div>

		<br />

		${getFooter(siteSettings)}
	</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'XRead Report');
};
