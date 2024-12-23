import { ReceiptHeaderProps } from '../components';
import { ItemBlockItems } from '../components/Printing/ItemBlock';
import { SiteSettings } from '../types';
import { formatInPeso, getTaxTypeDescription } from '../utils';
import { PESO_SIGN } from './helper-receipt';
import { EscPosCommands } from './utils/escpos.enum';

export const generateReceiptHeaderCommands = ({
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
		commands.push(`MIN: ${machineID}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}
	if (posTerminal) {
		commands.push(`SN: ${posTerminal}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (title) {
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(title);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	return commands;
};

export const generateReceiptFooterCommands = (siteSettings: SiteSettings) => {
	const {
		software_developer: softwareDeveloper,
		software_developer_address: softwareDeveloperAddress,
		software_developer_tin: softwareDeveloperTin,
		pos_accreditation_number: posAccreditationNumber,
		pos_accreditation_date: posAccreditationDate,
		ptu_number: ptuNumber,
		ptu_date: ptuDate,
	} = siteSettings;

	const commands: string[] = [];

	commands.push(EscPosCommands.ALIGN_CENTER);

	if (softwareDeveloper) {
		commands.push(softwareDeveloper);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (softwareDeveloperAddress) {
		const lines = softwareDeveloperAddress.split('\n');
		for (const line of lines) {
			commands.push(line);
			commands.push(EscPosCommands.LINE_BREAK);
		}
	}

	if (softwareDeveloperTin) {
		commands.push(softwareDeveloperTin);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (posAccreditationNumber) {
		commands.push(`Acc No: ${posAccreditationNumber}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(EscPosCommands.LINE_BREAK);

	if (posAccreditationDate) {
		commands.push(`Date Issued: ${posAccreditationDate}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (ptuNumber) {
		commands.push(`PTU No: ${ptuNumber}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (ptuDate) {
		commands.push(`Date Issued: ${ptuDate}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	return commands;
};

type ItemBlockItemsCommands = Omit<
	ItemBlockItems,
	'labelStyle' | 'contentStyle'
>;
export const generateItemBlockCommands = (items: ItemBlockItemsCommands[]) => {
	const commands: string[] = [];

	items.forEach((item) => {
		if (item.isIndented) {
			commands.push(EscPosCommands.ALIGN_LEFT);
			commands.push(' '.repeat(4));
		}

		commands.push(item.label);

		let value = item.value;

		if (item.isParenthesized) {
			value = `(${value})`;
		}

		commands.push(EscPosCommands.ALIGN_RIGHT);
		commands.push(value.toString());

		if (item.isUnderlined && typeof item.value === 'number' && item.value > 0) {
			commands.push(EscPosCommands.LINE_BREAK);
			commands.push('-----------');
		}

		commands.push(EscPosCommands.LINE_BREAK);
	});

	return commands;
};
