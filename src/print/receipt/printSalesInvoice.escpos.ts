import { getTransactionData } from '../../components/modals/ViewTransactionModal/TransactionContent';
import { ReceiptHeaderProps } from '../../components/Printing/ReceiptHeader';
import { SiteSettings, Transaction } from '../../types';
import { getTaxTypeDescription } from '../../utils';
import { print } from '../helper-receipt';
import { EscPosCommands } from '../utils/escpos.enum';

export const printSalesInvoiceEscPos = (
	transaction: Transaction,
	siteSettings: SiteSettings,
	isReprint = false,
) => {
	const {
		title,
		fields,
		change,
		previousTransactionOrNumber,
		newTransactionOrNumber,
	} = getTransactionData(transaction);
	const data = [
		EscPosCommands.INITIALIZE,
		...generateReceiptHeaderCommands({
			branchMachine: transaction.branch_machine,
			siteSettings,
			title,
		}),
	];

	print(data, 'Sales Invoice', undefined, 'raw');
};

const generateReceiptHeaderCommands = ({
	branchMachine,
	siteSettings,
	title,
}: ReceiptHeaderProps) => {
	const {
		contact_number: contactNumber,
		address_of_tax_payer: location,
		proprietor,
		store_name: storeName,
		tax_type: taxType,
		tin,
	} = siteSettings;

	const {
		name,
		machine_identification_number: machineID,
		pos_terminal: posTerminal,
	} = branchMachine || {};

	const commands: string[] = [];

	commands.push(EscPosCommands.ALIGN_CENTER);
	if (storeName) {
		const lines = storeName.split('\n');
		for (const line of lines) {
			commands.push(line);
			commands.push(EscPosCommands.LINE_BREAK);
		}
	}

	if (location) {
		const lines = location.split('\n');
		for (const line of lines) {
			commands.push(line);
			commands.push(EscPosCommands.LINE_BREAK);
		}
	}

	if (contactNumber || name) {
		commands.push([contactNumber, name].filter(Boolean).join(' | '));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (proprietor) {
		commands.push(proprietor);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (taxType || tin) {
		commands.push(
			[getTaxTypeDescription(taxType), tin].filter(Boolean).join(' | '),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (machineID) {
		commands.push('MIN: ' + machineID);
		commands.push(EscPosCommands.LINE_BREAK);
	}
	if (posTerminal) {
		commands.push('SN: ' + posTerminal);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (title) {
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(title);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	return commands;
};
