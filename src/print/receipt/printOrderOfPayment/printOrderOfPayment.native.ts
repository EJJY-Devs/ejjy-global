import { orderOfPaymentPurposes } from '../../../globals';
import {
	formatDate,
	formatDateTime,
	formatInPeso,
	getFullName,
} from '../../../utils';
import { PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintOrderOfPayment } from './types';

export const printOrderOfPaymentNative = ({
	orderOfPayment,
}: PrintOrderOfPayment): string[] => {
	const commands: string[] = [];

	const opNo = orderOfPayment.id;
	const date = formatDate(orderOfPayment.datetime_created);
	const payor = getFullName(orderOfPayment.payor);
	const address = orderOfPayment.payor.home_address;
	const amount = formatInPeso(orderOfPayment.amount, PESO_SIGN);
	const invoiceId =
		orderOfPayment?.charge_sales_transaction?.invoice?.or_number || '';
	const invoiceDate = orderOfPayment?.charge_sales_transaction
		? formatDateTime(
				orderOfPayment.charge_sales_transaction.invoice.datetime_created,
			)
		: '';

	let purposeDescription = orderOfPayment.extra_description;
	if (orderOfPayment.purpose === orderOfPaymentPurposes.PARTIAL_PAYMENT) {
		purposeDescription = 'Partial Payment';
	} else if (orderOfPayment.purpose === orderOfPaymentPurposes.FULL_PAYMENT) {
		purposeDescription = 'Full Payment';
	}

	// Header
	commands.push(EscPosCommands.ALIGN_CENTER);
	commands.push('Entity Name: EJ & JY WET MARKET AND ENTERPRISES');
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.ALIGN_LEFT);
	commands.push(EscPosCommands.LINE_BREAK);

	// OP No and Date
	commands.push(`OP No: ${opNo}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(`Date: ${date}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	// Title
	commands.push(EscPosCommands.ALIGN_CENTER);
	commands.push(EscPosCommands.BOLD_ON);
	commands.push('ORDER OF PAYMENT');
	commands.push(EscPosCommands.BOLD_OFF);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.ALIGN_LEFT);
	commands.push(EscPosCommands.LINE_BREAK);

	// Addressee
	commands.push('The Cashier');
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push('Cashiering Unit');
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	// Main content
	commands.push('Please issue Collection Receipt in favor of:');
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(`Payor: ${payor}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(`Address: ${address}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(`Amount: ${amount}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(`Payment of: ${purposeDescription}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(`Charge Invoice No: ${invoiceId}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(`Dated: ${invoiceDate}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	// Signature line
	commands.push(EscPosCommands.ALIGN_RIGHT);
	commands.push('_____________________________');
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push('Manager/Authorized Official');
	commands.push(EscPosCommands.ALIGN_LEFT);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
