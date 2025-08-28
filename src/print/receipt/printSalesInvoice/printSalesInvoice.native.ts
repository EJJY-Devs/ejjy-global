import dayjs from 'dayjs';
import { getTransactionData } from '../../../components/modals/ViewTransactionModal/TransactionContent';
import {
	INVOICE_LAST_MESSAGE,
	REPRINT_ONLY_MESSAGE,
	saleTypes,
	transactionStatuses,
	vatTypes,
} from '../../../globals';
import { SiteSettings, Transaction } from '../../../types';
import {
	formatDateTime,
	formatInPeso,
	getComputedDiscount,
} from '../../../utils';
import {
	generateItemBlockCommands,
	generateReceiptFooterCommands,
	generateReceiptHeaderCommands,
	printRight,
} from '../../helper-escpos';
import { EMPTY_CELL, PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintSalesInvoice } from './types';

export const printSalesInvoiceNative = ({
	transaction,
	siteSettings,
	isReprint = false,
}: PrintSalesInvoice) => {
	console.log(
		'[NATIVE-PRINT] Starting print job for transaction:',
		transaction.id,
	);

	const commands: string[] = [
		EscPosCommands.INITIALIZE, // Initialize printer first
		EscPosCommands.TEXT_SMALL, // Set small text (original font)
		// Don't set alignment here - let each section control its own alignment
		EscPosCommands.LINE_BREAK, // Add buffer space before content
	];

	// Add small delay command if available, or use line break as separator
	commands.push(EscPosCommands.LINE_BREAK);

	// Generate content with logging
	const contentCommands = generateTransactionContentCommands(
		transaction,
		siteSettings,
		isReprint,
	);
	console.log(
		'[NATIVE-PRINT] Generated',
		contentCommands.length,
		'content commands',
	);

	// Add spacing before content to prevent buffer overflow
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(...contentCommands);

	// Add spacing after content
	commands.push(EscPosCommands.LINE_BREAK);

	// Add proper ending sequence
	commands.push(
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.LINE_BREAK,
		EscPosCommands.CUT_PARTIAL, // Cut paper if printer supports it
	);

	console.log('[NATIVE-PRINT] Total commands generated:', commands.length);
	return commands;
};

const generateTransactionContentCommands = (
	transaction: Transaction,
	siteSettings: SiteSettings,
	isReprint: boolean,
) => {
	const {
		title,
		fields,
		change,
		previousTransactionOrNumber,
		newTransactionOrNumber,
	} = getTransactionData(transaction);

	const commands: string[] = [];

	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine: transaction.branch_machine,
			title,
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Reset to left alignment for transaction details
	commands.push(EscPosCommands.ALIGN_LEFT);
	commands.push(EscPosCommands.TEXT_SMALL); // Ensure small font is maintained

	// Products
	transaction.products.forEach((item) => {
		const productDetails = `${item.branch_product.product.print_details} - ${item.branch_product.product.is_vat_exempted ? vatTypes.VAT_EMPTY : vatTypes.VATABLE}`;
		const quantityAndPrice = `   ${item.quantity} @ ${formatInPeso(item.price_per_piece, PESO_SIGN)}`;
		const totalAmount = formatInPeso(
			Number(item.quantity) * Number(item.price_per_piece),
			PESO_SIGN,
		);

		commands.push(productDetails);
		commands.push(EscPosCommands.LINE_BREAK);

		commands.push(
			...generateItemBlockCommands([
				{
					label: quantityAndPrice,
					value: totalAmount,
					isIndented: true,
				},
			]),
		);
	});

	// Divider
	commands.push(printRight('----------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	// Discounts and Total
	if (transaction.discount_option) {
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'GROSS AMOUNT',
					value: formatInPeso(transaction.gross_amount, PESO_SIGN),
				},
				{
					label: `DISCOUNT | ${transaction.discount_option.code}`,
					value: formatInPeso(getComputedDiscount(transaction), PESO_SIGN),
					isParenthesized: true,
				},
			]),
		);

		if (transaction.discount_option.is_special_discount) {
			commands.push(
				...generateItemBlockCommands([
					{
						label: 'ADJ. ON VAT',
						value: formatInPeso(transaction.invoice.vat_amount, PESO_SIGN),
						isParenthesized: true,
					},
				]),
			);
		}

		commands.push(printRight('----------------'));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(
		...generateItemBlockCommands([
			{
				label: 'TOTAL AMOUNT',
				value: formatInPeso(transaction.total_amount, PESO_SIGN),
			},
		]),
	);

	// Payment Details
	if (transaction.payment.mode === saleTypes.CASH) {
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(
			...generateItemBlockCommands([
				{
					label: 'AMOUNT RECEIVED',
					value: formatInPeso(transaction.payment.amount_tendered, PESO_SIGN),
				},
				{
					label: 'AMOUNT DUE',
					value: formatInPeso(transaction.total_amount, PESO_SIGN),
				},
				{
					label: 'CHANGE',
					value: formatInPeso(change, PESO_SIGN),
				},
			]),
		);
	}

	// VAT Details
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'VAT Exempt',
				value: formatInPeso(transaction.invoice.vat_exempt, PESO_SIGN),
			},
			{
				label: 'VATable Sales',
				value: formatInPeso(transaction.invoice.vat_sales, PESO_SIGN),
			},
			{
				label: 'VAT Amount (12%)',
				value: formatInPeso(transaction.invoice.vat_amount, PESO_SIGN),
			},
			{
				label: 'ZERO Rated',
				value: formatInPeso(0, PESO_SIGN),
			},
		]),
	);

	// Add GDT and PDT
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push('GDT: ' + formatDateTime(transaction.invoice.datetime_created));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push('PDT: ' + formatDateTime(dayjs(), false));
	commands.push(EscPosCommands.LINE_BREAK);

	// OR Number and Item Count
	commands.push(
		...generateItemBlockCommands([
			{
				label: transaction.invoice.or_number,
				value: `${transaction.products.length} item(s)`,
			},
		]),
	);

	// Teller ID
	commands.push(transaction?.teller?.employee_id || EMPTY_CELL);
	commands.push(EscPosCommands.LINE_BREAK);

	// Previous and New Invoice Numbers
	if (previousTransactionOrNumber) {
		commands.push('Prev Invoice #: ' + previousTransactionOrNumber);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (newTransactionOrNumber) {
		commands.push('New Invoice #: ' + newTransactionOrNumber);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	// Additional Fields
	fields?.forEach(({ key, value }) => {
		commands.push(`${key}: ${value}`);
		commands.push(EscPosCommands.LINE_BREAK);
	});

	// Footer
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(...generateReceiptFooterCommands(siteSettings));

	// Final Messages
	if (transaction.status === transactionStatuses.FULLY_PAID) {
		commands.push(isReprint ? REPRINT_ONLY_MESSAGE : INVOICE_LAST_MESSAGE);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (
		[
			transactionStatuses.VOID_EDITED,
			transactionStatuses.VOID_CANCELLED,
		].includes(transaction.status)
	) {
		commands.push('VOIDED TRANSACTION');
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(`${siteSettings?.thank_you_message}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
