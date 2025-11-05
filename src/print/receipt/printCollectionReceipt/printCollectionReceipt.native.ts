import {
	formatInPeso,
	formatDateTime,
	formatDate,
	getFullName,
} from '../../../utils';
import { EMPTY_CELL, orderOfPaymentPurposes } from '../../../globals';
import {
	generateItemBlockCommands,
	generateReceiptFooterCommands,
	generateReceiptHeaderCommands,
	printCenter,
} from '../../helper-escpos';
import { PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintCollectionReceipt } from './types';
import dayjs from 'dayjs';

export const printCollectionReceiptNative = ({
	collectionReceipt,
	siteSettings,
}: PrintCollectionReceipt): string[] => [
	...generateCollectionReceiptContentCommands(collectionReceipt, siteSettings),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateCollectionReceiptContentCommands = (
	collectionReceipt: PrintCollectionReceipt['collectionReceipt'],
	siteSettings: PrintCollectionReceipt['siteSettings'],
): string[] => {
	const commands: string[] = [];

	const invoice =
		collectionReceipt.order_of_payment?.charge_sales_transaction?.invoice;
	const orderOfPayment = collectionReceipt?.order_of_payment;

	console.log('collectionReceipt', collectionReceipt);
	console.log('orderOfPayment', orderOfPayment);
	// const { amount } = orderOfPayment;

	let description = orderOfPayment.extra_description;
	if (orderOfPayment.purpose === orderOfPaymentPurposes.FULL_PAYMENT) {
		description = 'Full Payment';
	} else if (
		orderOfPayment.purpose === orderOfPaymentPurposes.PARTIAL_PAYMENT
	) {
		description = 'Partial Payment';
	}

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine: collectionReceipt.branch_machine,
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('[Collection Receipt]'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Received payment from'));
	commands.push(EscPosCommands.LINE_BREAK);

	// Customer details
	commands.push(
		...generateItemBlockCommands([
			// {
			// 	label: 'Name',
			// 	value: getFullName(payor),
			// },
			// {
			// 	label: 'Address',
			// 	value: payor.home_address || EMPTY_CELL,
			// },
			// {
			// 	label: 'Tin',
			// 	value: payor.tin || EMPTY_CELL,
			// },
			// {
			// 	label: 'the sum of',
			// 	value: formatInPeso(amount, PESO_SIGN),
			// },
			{
				label: 'Description',
				value: description || EMPTY_CELL,
			},
			{
				label: 'with invoice',
				value: invoice?.or_number || EMPTY_CELL,
			},
		]),
	);

	commands.push(EscPosCommands.LINE_BREAK);

	// Check details (if applicable)
	if (collectionReceipt.check_number) {
		commands.push('CHECK DETAILS');
		commands.push(EscPosCommands.LINE_BREAK);

		commands.push(
			...generateItemBlockCommands([
				{
					label: 'Bank',
					value: collectionReceipt.bank_name || EMPTY_CELL,
				},
				{
					label: 'Branch',
					value: collectionReceipt.bank_branch || EMPTY_CELL,
				},
				{
					label: 'Check No',
					value: collectionReceipt.check_number || EMPTY_CELL,
				},
				{
					label: 'Check Date',
					value: collectionReceipt.check_date
						? formatDate(collectionReceipt.check_date)
						: EMPTY_CELL,
				},
			]),
		);

		commands.push(EscPosCommands.LINE_BREAK);
	}

	// Footer details
	commands.push(`GDT: ${formatDateTime(collectionReceipt?.datetime_created)}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(`PDT: ${formatDateTime(dayjs(), false)}`);
	commands.push(EscPosCommands.LINE_BREAK);

	// ID and employee details
	const employeeId = collectionReceipt?.created_by?.employee_id || '';
	commands.push(`ID: ${collectionReceipt?.id || EMPTY_CELL}`);
	if (employeeId) {
		// Calculate padding for right alignment
		const idText = `ID: ${collectionReceipt?.id || EMPTY_CELL}`;
		const availableSpace = 40 - idText.length - employeeId.length;
		const padding = ' '.repeat(Math.max(1, availableSpace));
		// Replace the last command with the properly formatted line
		commands[commands.length - 1] = idText + padding + employeeId;
	}
	commands.push(EscPosCommands.LINE_BREAK);

	commands.push(EscPosCommands.LINE_BREAK);

	// Site settings footer
	commands.push(...generateReceiptFooterCommands(siteSettings));

	// Final messages
	commands.push(
		printCenter('This Document Is Not Valid For Claim Of Input Tax'),
	);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Thank You!'));
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
