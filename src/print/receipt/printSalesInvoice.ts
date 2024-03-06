import dayjs from 'dayjs';
import { saleTypes, transactionStatuses, vatTypes } from '../../globals';
import { BranchMachine, SiteSettings, Transaction } from '../../types';
import {
	formatDateTime,
	formatInPeso,
	getComputedDiscount,
	getFullName,
} from '../../utils';
import {
	EMPTY_CELL,
	PESO_SIGN,
	appendHtmlElement,
	getFooter,
	getHeader,
	getPageStyle,
	print,
} from '../helper-receipt';

export const printSalesInvoice = (
	transaction: Transaction,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	isReprint = false,
	isPdf = false,
) => {
	const change =
		Number(transaction.payment.amount_tendered) - transaction.total_amount;

	const previousTransactionOrNumber =
		transaction?.adjustment_remarks?.previous_voided_transaction?.invoice
			?.or_number;
	const newTransactionOrNumber =
		transaction?.adjustment_remarks?.new_updated_transaction?.invoice
			?.or_number;

	// Set discount option additional fields
	let discountOptionFields: Record<string, string> | null = null;
	if (transaction.discount_option_additional_fields_values) {
		discountOptionFields = JSON.parse(
			transaction.discount_option_additional_fields_values,
		);
	}

	// Set client name
	let title = '';
	if (transaction.payment.mode === saleTypes.CASH) {
		title = 'CASH SALES INVOICE';
	} else if (transaction.payment.mode === saleTypes.CREDIT) {
		title = 'CHARGE SALES INVOICE';
	}

	// Set client fields
	let fields: Record<string, string | undefined>[] = [];
	if (discountOptionFields !== null && discountOptionFields) {
		fields = Object.keys(discountOptionFields).map((key) => ({
			key,
			value: discountOptionFields?.[key],
		}));
	} else if (
		transaction.client?.name ||
		transaction.payment?.creditor_account
	) {
		fields = [
			{
				key: 'NAME',
				value:
					transaction.client?.name ||
					getFullName(transaction.payment?.creditor_account) ||
					'',
			},
			{
				key: 'TIN',
				value:
					transaction.client?.tin ||
					transaction.payment?.creditor_account?.tin ||
					'',
			},
			{
				key: 'ADDRESS',
				value:
					transaction.client?.address ||
					transaction.payment?.creditor_account?.home_address ||
					'',
			},
		];
	}

	const data = `
	<div class="container" style="${getPageStyle()}">
		${getHeader(siteSettings, branchMachine, title)}

		<br />

		<table style="width: 100%;">
			${transaction.products
				.map(
					(item) => `<tr>
						<td colspan="2">${item.branch_product.product.print_details} - ${
						item.branch_product.product.is_vat_exempted
							? vatTypes.VAT_EMPTY
							: vatTypes.VATABLE
					}</td>
					</tr>
					<tr>
						<td style="padding-left: 4ch">${item.original_quantity} @ ${formatInPeso(
						item.price_per_piece,
						PESO_SIGN,
					)} </td>
						<td style="text-align: right">
							${formatInPeso(
								Number(item.quantity) * Number(item.price_per_piece),
								PESO_SIGN,
							)}&nbsp;</td>
					</tr>`,
				)
				.join('')}
		</table>

		<div style="width: 100%; text-align: right">----------------</div>

		<table style="width: 100%;">
			${
				transaction.discount_option
					? `
        <tr>
				  <td>GROSS AMOUNT</td>
				  <td style="text-align: right;">
					  ${formatInPeso(transaction.gross_amount, PESO_SIGN)}&nbsp;
				  </td>
			  </tr>

        <tr>
				  <td>DISCOUNT | ${transaction.discount_option.code}</td>
				  <td style="text-align: right;">
					  (${formatInPeso(getComputedDiscount(transaction), PESO_SIGN)})
				  </td>
			  </tr>

        ${
					transaction.discount_option.is_special_discount
						? `<tr>
				  <td>VAT AMOUNT</td>
				  <td style="text-align: right;">
					  (${formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)})
				  </td>
			  </tr>`
						: ''
				}

        <tr>
				  <td colspan="2" style="text-align: right;">----------------</td>
			  </tr>
      `
					: ''
			}

			<tr>
				<td>TOTAL AMOUNT</td>
				<td style="text-align: right; font-weight: bold;">
					${formatInPeso(transaction.total_amount, PESO_SIGN)}&nbsp;
				</td>
			</tr>
		</table>

		<br />

    ${
			transaction.payment.mode === saleTypes.CASH
				? `
        <table style="width: 100%;">
          <tr>
            <td style="padding-left: 4ch">AMOUNT RECEIVED</td>
            <td style="text-align: right">
              ${formatInPeso(
								transaction.payment.amount_tendered,
								PESO_SIGN,
							)}&nbsp;
            </td>
          </tr>
          <tr>
            <td style="padding-left: 4ch">AMOUNT DUE</td>
            <td style="text-align: right">
              ${formatInPeso(transaction.total_amount, PESO_SIGN)}&nbsp;
            </td>
          </tr>
          <tr>
            <td style="padding-left: 4ch">CHANGE</td>
            <td style="text-align: right; font-weight: bold">
              ${formatInPeso(change, PESO_SIGN)}&nbsp;
            </td>
          </tr>
        </table><br />`
				: ''
		}

    <table style="width: 100%;">
      <tr>
        <td>VAT Exempt</td>
        <td style="text-align: right">
          ${formatInPeso(transaction.invoice.vat_exempt, PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>VATable Sales</td>
        <td style="text-align: right">
          ${formatInPeso(transaction.invoice.vat_sales, PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>VAT Amount (12%)</td>
        <td style="text-align: right">
          ${formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)}&nbsp;
        </td>
      </tr>
      <tr>
        <td>ZERO Rated</td>
        <td style="text-align: right">
          ${formatInPeso(0, PESO_SIGN)}&nbsp;
        </td>
      </tr>
    </table>
    <br />

    <div>GDT: ${formatDateTime(transaction.invoice.datetime_created)}</div>
    <div>PDT: ${formatDateTime(dayjs(), false)}</div>

		<div style="display: flex; align-items: center; justify-content: space-between">
			<span>${transaction.invoice.or_number}</span>
			<span>${transaction.products.length} item(s)</span>
		</div>

    <div>${transaction?.teller?.employee_id || EMPTY_CELL}</div>

    <br />

    ${
			previousTransactionOrNumber
				? `<div>Prev Invoice #: ${previousTransactionOrNumber}</div>`
				: ''
		}
    ${
			newTransactionOrNumber
				? `<div>New Invoice #: ${newTransactionOrNumber}</div>`
				: ''
		}

    <table style="width: 100%; padding-left: 4ch;">
    ${fields
			.map(
				({ key, value }) =>
					`<tr>
            <td width="80px">${key}:</td>
            <td>${value}</td>
          </tr>`,
			)
			.join('')}
    </table>

		<br />

		${getFooter(siteSettings)}

		<div style="text-align: center; display: flex; flex-direction: column">
      <span>${
				isReprint && transaction.status === transactionStatuses.FULLY_PAID
					? 'REPRINT ONLY'
					: ''
			}</span>
      <span style="white-space: pre-line">${
				!isReprint && transaction.status === transactionStatuses.FULLY_PAID
					? siteSettings?.invoice_last_message
					: ''
			}</span>
      <span>${
				[
					transactionStatuses.VOID_EDITED,
					transactionStatuses.VOID_CANCELLED,
				].includes(transaction.status)
					? 'VOIDED TRANSACTION'
					: ''
			}</span>

      <span>"${siteSettings?.thank_you_message}"</span>
		</div>
	</div>
	`;

	if (isPdf) {
		return appendHtmlElement(data);
	}

	print(data, 'Sales Invoice');
};
