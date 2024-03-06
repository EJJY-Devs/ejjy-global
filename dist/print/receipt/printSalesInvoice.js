"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSalesInvoice = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const globals_1 = require("../../globals");
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const printSalesInvoice = (transaction, siteSettings, branchMachine, isReprint = false, isPdf = false) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const change = Number(transaction.payment.amount_tendered) - transaction.total_amount;
    const previousTransactionOrNumber = (_c = (_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.adjustment_remarks) === null || _a === void 0 ? void 0 : _a.previous_voided_transaction) === null || _b === void 0 ? void 0 : _b.invoice) === null || _c === void 0 ? void 0 : _c.or_number;
    const newTransactionOrNumber = (_f = (_e = (_d = transaction === null || transaction === void 0 ? void 0 : transaction.adjustment_remarks) === null || _d === void 0 ? void 0 : _d.new_updated_transaction) === null || _e === void 0 ? void 0 : _e.invoice) === null || _f === void 0 ? void 0 : _f.or_number;
    // Set discount option additional fields
    let discountOptionFields = null;
    if (transaction.discount_option_additional_fields_values) {
        discountOptionFields = JSON.parse(transaction.discount_option_additional_fields_values);
    }
    // Set client name
    let title = '';
    if (transaction.payment.mode === globals_1.saleTypes.CASH) {
        title = 'CASH SALES INVOICE';
    }
    else if (transaction.payment.mode === globals_1.saleTypes.CREDIT) {
        title = 'CHARGE SALES INVOICE';
    }
    // Set client fields
    let fields = [];
    if (discountOptionFields !== null && discountOptionFields) {
        fields = Object.keys(discountOptionFields).map((key) => ({
            key,
            value: discountOptionFields === null || discountOptionFields === void 0 ? void 0 : discountOptionFields[key],
        }));
    }
    else if (((_g = transaction.client) === null || _g === void 0 ? void 0 : _g.name) ||
        ((_h = transaction.payment) === null || _h === void 0 ? void 0 : _h.creditor_account)) {
        fields = [
            {
                key: 'NAME',
                value: ((_j = transaction.client) === null || _j === void 0 ? void 0 : _j.name) ||
                    (0, utils_1.getFullName)((_k = transaction.payment) === null || _k === void 0 ? void 0 : _k.creditor_account) ||
                    '',
            },
            {
                key: 'TIN',
                value: ((_l = transaction.client) === null || _l === void 0 ? void 0 : _l.tin) ||
                    ((_o = (_m = transaction.payment) === null || _m === void 0 ? void 0 : _m.creditor_account) === null || _o === void 0 ? void 0 : _o.tin) ||
                    '',
            },
            {
                key: 'ADDRESS',
                value: ((_p = transaction.client) === null || _p === void 0 ? void 0 : _p.address) ||
                    ((_r = (_q = transaction.payment) === null || _q === void 0 ? void 0 : _q.creditor_account) === null || _r === void 0 ? void 0 : _r.home_address) ||
                    '',
            },
        ];
    }
    const data = `
	<div class="container" style="${(0, helper_receipt_1.getPageStyle)()}">
		${(0, helper_receipt_1.getHeader)(siteSettings, branchMachine, title)}

		<br />

		<table style="width: 100%;">
			${transaction.products
        .map((item) => `<tr>
						<td colspan="2">${item.branch_product.product.print_details} - ${item.branch_product.product.is_vat_exempted
        ? globals_1.vatTypes.VAT_EMPTY
        : globals_1.vatTypes.VATABLE}</td>
					</tr>
					<tr>
						<td style="padding-left: 4ch">${item.original_quantity} @ ${(0, utils_1.formatInPeso)(item.price_per_piece, helper_receipt_1.PESO_SIGN)} </td>
						<td style="text-align: right">
							${(0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece), helper_receipt_1.PESO_SIGN)}&nbsp;</td>
					</tr>`)
        .join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<table style="width: 100%;">
			${transaction.discount_option
        ? `
        <tr>
				  <td>GROSS AMOUNT</td>
				  <td style="text-align: right;">
					  ${(0, utils_1.formatInPeso)(transaction.gross_amount, helper_receipt_1.PESO_SIGN)}&nbsp;
				  </td>
			  </tr>

        <tr>
				  <td>DISCOUNT | ${transaction.discount_option.code}</td>
				  <td style="text-align: right;">
					  (${(0, utils_1.formatInPeso)((0, utils_1.getComputedDiscount)(transaction), helper_receipt_1.PESO_SIGN)})
				  </td>
			  </tr>

        ${transaction.discount_option.is_special_discount
            ? `<tr>
				  <td>VAT AMOUNT</td>
				  <td style="text-align: right;">
					  (${(0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN)})
				  </td>
			  </tr>`
            : ''}

        <tr>
				  <td colspan="2" style="text-align: right;">----------------</td>
			  </tr>
      `
        : ''}

			<tr>
				<td>TOTAL AMOUNT</td>
				<td style="text-align: right; font-weight: bold;">
					${(0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN)}&nbsp;
				</td>
			</tr>
		</table>

		<br />

    ${transaction.payment.mode === globals_1.saleTypes.CASH
        ? `
        <table style="width: 100%;">
          <tr>
            <td style="padding-left: 4ch">AMOUNT RECEIVED</td>
            <td style="text-align: right">
              ${(0, utils_1.formatInPeso)(transaction.payment.amount_tendered, helper_receipt_1.PESO_SIGN)}&nbsp;
            </td>
          </tr>
          <tr>
            <td style="padding-left: 4ch">AMOUNT DUE</td>
            <td style="text-align: right">
              ${(0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN)}&nbsp;
            </td>
          </tr>
          <tr>
            <td style="padding-left: 4ch">CHANGE</td>
            <td style="text-align: right; font-weight: bold">
              ${(0, utils_1.formatInPeso)(change, helper_receipt_1.PESO_SIGN)}&nbsp;
            </td>
          </tr>
        </table><br />`
        : ''}

    <table style="width: 100%;">
      <tr>
        <td>VAT Exempt</td>
        <td style="text-align: right">
          ${(0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, helper_receipt_1.PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">
          ${(0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">
          ${(0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>ZERO Rated</td>
        <td style="text-align: right">
          ${(0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN)}&nbsp;
        </td>
      </tr>
    </table>
    <br />

    <div>GDT: ${(0, utils_1.formatDateTime)(transaction.invoice.datetime_created)}</div>
    <div>PDT: ${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)}</div>

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>${transaction.invoice.or_number}</span>
			<span>${transaction.products.length} item(s)</span>
		</div>

    <div>${((_s = transaction === null || transaction === void 0 ? void 0 : transaction.teller) === null || _s === void 0 ? void 0 : _s.employee_id) || helper_receipt_1.EMPTY_CELL}</div>

    <br />

    ${previousTransactionOrNumber
        ? `<div>Prev Invoice #: ${previousTransactionOrNumber}</div>`
        : ''}
    ${newTransactionOrNumber
        ? `<div>New Invoice #: ${newTransactionOrNumber}</div>`
        : ''}

    <table style="width: 100%; padding-left: 4ch;">
    ${fields
        .map(({ key, value }) => `<tr>
            <td width="80px">${key}:</td>
            <td>${value}</td>
          </tr>`)
        .join('')}
    </table>

		<br />

		${(0, helper_receipt_1.getFooter)(siteSettings)}

		<div style="text-align: center; display: flex; flex-direction: column">
      <span>${isReprint && transaction.status === globals_1.transactionStatuses.FULLY_PAID
        ? 'REPRINT ONLY'
        : ''}</span>
      <span style="white-space: pre-line">${!isReprint && transaction.status === globals_1.transactionStatuses.FULLY_PAID
        ? siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.invoice_last_message
        : ''}</span>
      <span>${[
        globals_1.transactionStatuses.VOID_EDITED,
        globals_1.transactionStatuses.VOID_CANCELLED,
    ].includes(transaction.status)
        ? 'VOIDED TRANSACTION'
        : ''}</span>

      <span>"${siteSettings === null || siteSettings === void 0 ? void 0 : siteSettings.thank_you_message}"</span>
		</div>
	</div>
	`;
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Sales Invoice');
};
exports.printSalesInvoice = printSalesInvoice;
