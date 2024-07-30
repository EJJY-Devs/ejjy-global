import dayjs from 'dayjs';
import React from 'react';
import {
	EMPTY_CELL,
	INVOICE_LAST_MESSAGE,
	saleTypes,
	transactionStatuses,
	vatTypes,
} from '../../../globals';
import { PESO_SIGN } from '../../../print/helper-receipt';
import { SiteSettings, Transaction } from '../../../types';
import {
	formatDateTime,
	formatInPeso,
	getComputedDiscount,
	getFullName,
} from '../../../utils';
import { ReceiptFooter, ReceiptHeader } from '../../Printing';

type Props = {
	transaction: Transaction;
	siteSettings: SiteSettings;
	isReprint?: boolean;
};

export const getTransactionData = (transaction: Transaction) => {
	let title = '';

	if (transaction.payment.mode === saleTypes.CASH) {
		title = 'CASH SALES INVOICE';
	} else if (transaction.payment.mode === saleTypes.CREDIT) {
		title = 'CHARGE SALES INVOICE';
	}

	let fields: Record<string, string | undefined>[] = [];
	if (transaction?.discount_option_additional_fields_values?.length) {
		const discountOptionFields = JSON.parse(
			transaction.discount_option_additional_fields_values,
		);

		fields = Object.keys(discountOptionFields).map((key) => ({
			key,
			value: discountOptionFields[key],
		}));
	} else if (
		transaction?.client?.name ||
		transaction?.payment?.creditor_account
	) {
		fields = [
			{
				key: 'NAME',
				value:
					transaction.client?.name ||
					getFullName(transaction.payment?.creditor_account) ||
					EMPTY_CELL,
			},
			{
				key: 'TIN',
				value:
					transaction.client?.tin ||
					transaction.payment?.creditor_account?.tin ||
					EMPTY_CELL,
			},
			{
				key: 'ADDRESS',
				value:
					transaction.client?.address ||
					transaction.payment?.creditor_account?.home_address ||
					EMPTY_CELL,
			},
		];
	}

	const change =
		Number(transaction.payment.amount_tendered) - transaction.total_amount;

	const previousTransactionOrNumber =
		transaction?.adjustment_remarks?.previous_voided_transaction?.invoice
			?.or_number;
	const newTransactionOrNumber =
		transaction?.adjustment_remarks?.new_updated_transaction?.invoice
			?.or_number;

	return {
		title,
		fields,
		change,
		previousTransactionOrNumber,
		newTransactionOrNumber,
	};
};

export const TransactionContent = ({
	transaction,
	siteSettings,
	isReprint,
}: Props) => {
	const {
		title,
		fields,
		change,
		previousTransactionOrNumber,
		newTransactionOrNumber,
	} = getTransactionData(transaction);

	return (
		<>
			<ReceiptHeader
				branchMachine={transaction.branch_machine}
				siteSettings={siteSettings}
				title={title}
			/>

			<br />

			<table style={{ width: '100%' }}>
				{transaction.products.map((item) => (
					<>
						<tr>
							<td colSpan={2}>
								{item.branch_product.product.print_details} -{' '}
								{item.branch_product.product.is_vat_exempted
									? vatTypes.VAT_EMPTY
									: vatTypes.VATABLE}
							</td>
						</tr>
						<tr>
							<td style={{ paddingLeft: '4ch' }}>
								{item.original_quantity} @{' '}
								{formatInPeso(item.price_per_piece, PESO_SIGN)}
							</td>
							<td style={{ textAlign: 'right' }}>
								{formatInPeso(
									Number(item.quantity) * Number(item.price_per_piece),
									PESO_SIGN,
								)}
								&nbsp;
							</td>
						</tr>
					</>
				))}
			</table>

			<div style={{ width: '100%', textAlign: 'right' }}>----------------</div>

			<table style={{ width: '100%' }}>
				{transaction.discount_option && (
					<>
						<tr>
							<td>GROSS AMOUNT</td>
							<td style={{ textAlign: 'right' }}>
								{formatInPeso(transaction.gross_amount, PESO_SIGN)}&nbsp;
							</td>
						</tr>

						<tr>
							<td>DISCOUNT | {transaction.discount_option.code}</td>
							<td style={{ textAlign: 'right' }}>
								({formatInPeso(getComputedDiscount(transaction), PESO_SIGN)})
							</td>
						</tr>

						{transaction.discount_option.is_special_discount && (
							<tr>
								<td>ADJ. ON VAT</td>
								<td style={{ textAlign: 'right' }}>
									({formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)})
								</td>
							</tr>
						)}

						<tr>
							<td colSpan={2} style={{ textAlign: 'right' }}>
								----------------
							</td>
						</tr>
					</>
				)}

				<tr>
					<td>TOTAL AMOUNT</td>
					<td style={{ textAlign: 'right', fontWeight: 'bold' }}>
						{formatInPeso(transaction.total_amount, PESO_SIGN)}&nbsp;
					</td>
				</tr>
			</table>

			<br />

			{transaction.payment.mode === saleTypes.CASH && (
				<>
					<table style={{ width: '100%' }}>
						<tr>
							<td style={{ paddingLeft: '4ch' }}>AMOUNT RECEIVED</td>
							<td style={{ textAlign: 'right' }}>
								{formatInPeso(transaction.payment.amount_tendered, PESO_SIGN)}
								&nbsp;
							</td>
						</tr>
						<tr>
							<td style={{ paddingLeft: '4ch' }}>AMOUNT DUE</td>
							<td style={{ textAlign: 'right' }}>
								{formatInPeso(transaction.total_amount, PESO_SIGN)}&nbsp;
							</td>
						</tr>
						<tr>
							<td style={{ paddingLeft: '4ch' }}>CHANGE</td>
							<td style={{ textAlign: 'right', fontWeight: 'bold' }}>
								{formatInPeso(change, PESO_SIGN)}&nbsp;
							</td>
						</tr>
					</table>
					<br />
				</>
			)}

			<table style={{ width: '100%' }}>
				<tr>
					<td>VAT Exempt</td>
					<td style={{ textAlign: 'right' }}>
						{formatInPeso(transaction.invoice.vat_exempt, PESO_SIGN)}&nbsp;
					</td>
				</tr>
				<tr>
					<td>VATable Sales</td>
					<td style={{ textAlign: 'right' }}>
						{formatInPeso(transaction.invoice.vat_sales, PESO_SIGN)}&nbsp;
					</td>
				</tr>
				<tr>
					<td>VAT Amount (12%)</td>
					<td style={{ textAlign: 'right' }}>
						{formatInPeso(transaction.invoice.vat_amount, PESO_SIGN)}&nbsp;
					</td>
				</tr>
				<tr>
					<td>ZERO Rated</td>
					<td style={{ textAlign: 'right' }}>
						{formatInPeso(0, PESO_SIGN)}&nbsp;
					</td>
				</tr>
			</table>

			<br />

			<div>GDT: {formatDateTime(transaction.invoice.datetime_created)}</div>
			<div>PDT: {formatDateTime(dayjs(), false)}</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<span>{transaction.invoice.or_number}</span>
				<span>{transaction.products.length} item(s)</span>
			</div>
			<div>{transaction?.teller?.employee_id || EMPTY_CELL}</div>

			<br />

			{previousTransactionOrNumber && (
				<div>Prev Invoice #: {previousTransactionOrNumber}</div>
			)}
			{newTransactionOrNumber && (
				<div>New Invoice #: {newTransactionOrNumber}</div>
			)}

			<table style={{ width: '100%', paddingLeft: '4ch' }}>
				{fields.map(({ key, value }) => (
					<tr>
						<td style={{ width: 130 }}>{key}:</td>
						<td>{value}</td>
					</tr>
				))}
			</table>

			<br />

			<ReceiptFooter siteSettings={siteSettings} />
			<br />

			<div
				style={{
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{transaction.status === transactionStatuses.FULLY_PAID && (
					<span style={{ whiteSpace: 'pre-line' }}>
						{isReprint ? 'REPRINT ONLY' : INVOICE_LAST_MESSAGE}
					</span>
				)}

				<span>
					{[
						transactionStatuses.VOID_EDITED,
						transactionStatuses.VOID_CANCELLED,
					].includes(transaction.status) && 'VOIDED TRANSACTION'}
				</span>

				<span>"{siteSettings?.thank_you_message}"</span>
			</div>
		</>
	);
};
