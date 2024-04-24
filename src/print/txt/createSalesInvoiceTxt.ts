import dayjs from 'dayjs';
import {
	INVOICE_LAST_MESSAGE,
	saleTypes,
	transactionStatuses,
	vatTypes,
} from '../../globals';
import { SiteSettings, Transaction } from '../../types';
import {
	ReportTextFile,
	formatDateTime,
	formatInPeso,
	getComputedDiscount,
	getFullName,
} from '../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../helper-receipt';
import { writeFooter, writeHeader } from '../helper-txt';

type DiscountOptionField = {
	key: string;
	value: string;
};

export const createSalesInvoiceTxt = (
	transaction: Transaction,
	siteSettings: SiteSettings,
	isReprint = false,
	returnContent = false,
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
	let discountOptionFields: any | undefined;
	if (transaction?.discount_option_additional_fields_values) {
		discountOptionFields = JSON.parse(
			transaction?.discount_option_additional_fields_values,
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
	let fields: DiscountOptionField[] = [];
	if (discountOptionFields && typeof discountOptionFields === 'object') {
		fields = Object.keys(discountOptionFields).map((key) => ({
			key,
			value: discountOptionFields ? discountOptionFields[key] : EMPTY_CELL,
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

	const reportTextFile = new ReportTextFile();
	let rowNumber = 0;

	rowNumber = writeHeader(
		reportTextFile,
		siteSettings,
		transaction.branch_machine,
		rowNumber,
		title,
	);

	rowNumber += 1;

	rowNumber += 1;
	transaction.products.forEach((item) => {
		reportTextFile.write({
			text: `${item.branch_product.product.name} - ${
				item.branch_product.product.is_vat_exempted
					? vatTypes.VAT_EMPTY
					: vatTypes.VATABLE
			}`,
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		rowNumber += 1;

		reportTextFile.write({
			text: `    ${item.original_quantity} @ ${formatInPeso(
				item.price_per_piece,
				PESO_SIGN,
			)}`,
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		reportTextFile.write({
			text: formatInPeso(
				Number(item.quantity) * Number(item.price_per_piece),
				PESO_SIGN,
			),
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;
	});

	reportTextFile.write({
		text: '----------------',
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	if (transaction.discount_option) {
		reportTextFile.write({
			text: 'GROSS AMOUNT',
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		reportTextFile.write({
			text: formatInPeso(transaction.gross_amount, PESO_SIGN),
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;

		reportTextFile.write({
			text: `DISCOUNT | ${transaction.discount_option.code}`,
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		reportTextFile.write({
			text: `(${formatInPeso(getComputedDiscount(transaction), PESO_SIGN)})`,
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;

		if (transaction.discount_option.is_special_discount) {
			reportTextFile.write({
				text: 'VAT AMOUNT',
				alignment: ReportTextFile.ALIGNMENTS.LEFT,
				rowNumber,
			});
			reportTextFile.write({
				text: `(${formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)})`,
				alignment: ReportTextFile.ALIGNMENTS.RIGHT,
				rowNumber,
			});
			rowNumber += 1;
		}

		reportTextFile.write({
			text: '----------------',
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;
	}
	reportTextFile.write({
		text: 'TOTAL AMOUNT',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: formatInPeso(transaction.total_amount, PESO_SIGN),
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	if (transaction.payment.mode === saleTypes.CASH) {
		rowNumber += 1;

		reportTextFile.write({
			text: '   AMOUNT RECEIVED',
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		reportTextFile.write({
			text: formatInPeso(transaction.payment.amount_tendered, PESO_SIGN),
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;
		reportTextFile.write({
			text: '   AMOUNT DUE',
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		reportTextFile.write({
			text: formatInPeso(transaction.total_amount, PESO_SIGN),
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;
		reportTextFile.write({
			text: '   CHANGE',
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		reportTextFile.write({
			text: formatInPeso(change, PESO_SIGN),
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});

		rowNumber += 1;
	}

	rowNumber += 1;

	reportTextFile.write({
		text: 'VAT Exempt',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: formatInPeso(transaction.invoice.vat_exempt, PESO_SIGN),
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: 'VATable Sales',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: formatInPeso(transaction.invoice.vat_sales, PESO_SIGN),
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: 'VAT Amount (12%)',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: formatInPeso(transaction.invoice.vat_amount, PESO_SIGN),
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: 'ZERO Rated',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: formatInPeso(0, PESO_SIGN),
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});

	rowNumber += 1;

	rowNumber += 1;

	rowNumber += 1;

	reportTextFile.write({
		text: `GDT: ${formatDateTime(transaction.invoice.datetime_created)}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `PDT: ${formatDateTime(dayjs(), false)}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: transaction.invoice.or_number,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});

	reportTextFile.write({
		text: `${transaction.products.length} item(s)`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: transaction.teller.employee_id,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	if (previousTransactionOrNumber) {
		reportTextFile.write({
			text: `Prev Invoice #: ${previousTransactionOrNumber}`,
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		rowNumber += 1;
	}

	if (newTransactionOrNumber) {
		reportTextFile.write({
			text: `New Invoice #: ${newTransactionOrNumber}`,
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		rowNumber += 1;
	}

	fields.forEach(({ key, value }) => {
		reportTextFile.write({
			text: `${key}: ${value}`,
			alignment: ReportTextFile.ALIGNMENTS.LEFT,
			rowNumber,
		});
		rowNumber += 1;
	});

	rowNumber += 1;

	rowNumber = writeFooter(reportTextFile, siteSettings, rowNumber);

	if (transaction.status === transactionStatuses.FULLY_PAID) {
		rowNumber += 1;
		reportTextFile.write({
			text: isReprint ? 'REPRINT ONLY' : INVOICE_LAST_MESSAGE,
			alignment: ReportTextFile.ALIGNMENTS.CENTER,
			rowNumber,
		});
	}

	if (
		[
			transactionStatuses.VOID_EDITED,
			transactionStatuses.VOID_CANCELLED,
		].includes(transaction.status)
	) {
		rowNumber += 2;

		reportTextFile.write({
			text: 'VOIDED TRANSACTION',
			alignment: ReportTextFile.ALIGNMENTS.CENTER,
			rowNumber,
		});
	}

	rowNumber += 1;
	reportTextFile.write({
		text: siteSettings?.thank_you_message,
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
		rowNumber,
	});

	if (returnContent) {
		return reportTextFile.get();
	}

	reportTextFile.export(`Sales_Invoice_${transaction.invoice.or_number}.txt`);

	return null;
};
