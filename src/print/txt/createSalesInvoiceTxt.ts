import dayjs from 'dayjs';
import { getTransactionData } from '../../components/modals/ViewTransactionModal/TransactionContent';
import {
	INVOICE_LAST_MESSAGE,
	saleTypes,
	transactionStatuses,
	vatTypes,
} from '../../globals';
import { SiteSettings, Transaction } from '../../types';
import { formatDateTime, formatInPeso, getComputedDiscount } from '../../utils';
import { EMPTY_CELL, PESO_SIGN, UNDERLINE_TEXT } from '../helper-receipt';
import {
	getTxtFooter,
	getTxtHeader,
	getTxtItemBlock,
	RowData,
	TXT_LINE_BREAK,
	TXT_NBSP,
	writeFile,
} from '../helper-txt';

export const createSalesInvoiceTxt = (
	transaction: Transaction,
	siteSettings: SiteSettings,
	isReprint = false,
	returnContent = false,
) => {
	const {
		title,
		fields,
		change,
		previousTransactionOrNumber,
		newTransactionOrNumber,
	} = getTransactionData(transaction);

	const rowData: (RowData | string)[] = getTxtHeader({
		branchMachine: transaction.branch_machine,
		siteSettings,
	});

	rowData.push(...[TXT_LINE_BREAK, { center: title }, TXT_LINE_BREAK]);

	transaction.products.forEach((item) => {
		rowData.push(
			...[
				{
					left: `${item.branch_product.product.print_details} - ${
						item.branch_product.product.is_vat_exempted
							? vatTypes.VAT_EMPTY
							: vatTypes.VATABLE
					}`,
				},
				{
					left: `    ${item.original_quantity} @ ${formatInPeso(item.price_per_piece, PESO_SIGN)}`,
					right: formatInPeso(
						Number(item.quantity) * Number(item.price_per_piece),
						PESO_SIGN,
					),
				},
			],
		);
	});

	rowData.push({
		right: '----------------',
	});

	if (transaction.discount_option) {
		rowData.push(
			...getTxtItemBlock([
				{
					label: 'GROSS AMOUNT',
					value: formatInPeso(transaction.gross_amount, PESO_SIGN) + TXT_NBSP,
				},
				{
					label: `DISCOUNT | ${transaction.discount_option.code}`,
					value: `(${formatInPeso(getComputedDiscount(transaction), PESO_SIGN)})`,
				},
			]),
		);

		if (transaction.discount_option.is_special_discount) {
			rowData.push(
				...[
					...getTxtItemBlock([
						{
							label: 'ADJ. ON VAT',
							value: `(${formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)})`,
						},
					]),
				],
				{ right: UNDERLINE_TEXT },
			);
		}
	}

	rowData.push(
		...getTxtItemBlock([
			{
				label: 'TOTAL AMOUNT',
				value: formatInPeso(transaction.total_amount, PESO_SIGN) + TXT_NBSP,
			},
		]),
	);

	if (transaction.payment.mode === saleTypes.CASH) {
		rowData.push(
			...[
				TXT_LINE_BREAK,
				...getTxtItemBlock([
					{
						label: '    AMOUNT RECEIVED',
						value:
							formatInPeso(transaction.payment.amount_tendered, PESO_SIGN) +
							TXT_NBSP,
					},
					{
						label: '    AMOUNT DUE',
						value: formatInPeso(transaction.total_amount, PESO_SIGN) + TXT_NBSP,
					},
					{
						label: '    CHANGE',
						value: formatInPeso(change, PESO_SIGN) + TXT_NBSP,
					},
				]),
			],
		);
	}

	rowData.push(
		...[
			TXT_LINE_BREAK,
			...getTxtItemBlock([
				{
					label: 'VAT Exempt',
					value:
						formatInPeso(transaction.invoice.vat_exempt, PESO_SIGN) + TXT_NBSP,
				},
				{
					label: 'VATable Sales',
					value:
						formatInPeso(transaction.invoice.vat_sales, PESO_SIGN) + TXT_NBSP,
				},
				{
					label: 'VAT Amount (12%)',
					value:
						formatInPeso(transaction.invoice.vat_amount, PESO_SIGN) + TXT_NBSP,
				},
				{
					label: 'ZERO Rated',
					value: formatInPeso(0, PESO_SIGN) + TXT_NBSP,
				},
			]),
		],
	);

	rowData.push(
		...[
			{ left: `GDT: ${formatDateTime(transaction.invoice.datetime_created)}` },
			{ left: `PDT: ${formatDateTime(dayjs(), false)}` },
			{
				left: transaction.invoice.or_number,
				right: `${transaction.products.length} item(s)`,
			},
			{ left: transaction?.teller?.employee_id || EMPTY_CELL },
		],
	);

	if (previousTransactionOrNumber) {
		rowData.push({ left: `Prev Invoice #: ${previousTransactionOrNumber}` });
	}

	if (newTransactionOrNumber) {
		rowData.push({ left: `New Invoice #: ${newTransactionOrNumber}` });
	}

	fields.forEach(({ key, value }) => {
		rowData.push({
			left: `${key}: ${value}`,
		});
	});

	rowData.push(...[TXT_LINE_BREAK, ...getTxtFooter(siteSettings)]);

	if (isReprint && transaction.status === transactionStatuses.FULLY_PAID) {
		rowData.push({
			center: isReprint ? 'REPRINT ONLY' : INVOICE_LAST_MESSAGE,
		});
	}

	if (
		[
			transactionStatuses.VOID_EDITED,
			transactionStatuses.VOID_CANCELLED,
		].includes(transaction.status)
	) {
		rowData.push({ center: 'VOIDED TRANSACTION' });
	}

	rowData.push({
		center: siteSettings?.thank_you_message,
	});

	const reportTextFile = writeFile(rowData);

	if (returnContent) {
		return reportTextFile.get();
	}

	reportTextFile.export(`Sales_Invoice_${transaction.invoice.or_number}.txt`);

	return null;
};
