import { ReceiptHeaderProps } from '../components';
import { ItemBlockItems } from '../components/Printing/ItemBlock';
import { SiteSettings } from '../types';
import { getTaxTypeDescription } from '../utils';
import { EscPosCommands } from './utils/escpos.enum';

const PAPER_CHARACTER_WIDTH = 40;

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

	if (storeName) {
		const lines = storeName.split('\n');
		for (const line of lines) {
			commands.push(printCenter(line));
			commands.push(EscPosCommands.LINE_BREAK);
		}
	}

	if (location) {
		const lines = location.split('\n');
		for (const line of lines) {
			commands.push(printCenter(line));
			commands.push(EscPosCommands.LINE_BREAK);
		}
	}

	if (contactNumber || name) {
		commands.push(
			printCenter([contactNumber, name].filter(Boolean).join(' | ')),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (proprietor) {
		commands.push(printCenter(proprietor));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (taxType || tin) {
		commands.push(
			printCenter(
				[getTaxTypeDescription(taxType), tin].filter(Boolean).join(' | '),
			),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (machineID) {
		commands.push(printCenter(`MIN: ${machineID}`));
		commands.push(EscPosCommands.LINE_BREAK);
	}
	if (posTerminal) {
		commands.push(printCenter(`SN: ${posTerminal}`));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (title) {
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(printCenter(title));
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

	if (softwareDeveloper) {
		commands.push(printCenter(softwareDeveloper));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (softwareDeveloperAddress) {
		const lines = softwareDeveloperAddress.split('\n');
		for (const line of lines) {
			commands.push(printCenter(line));
			commands.push(EscPosCommands.LINE_BREAK);
		}
	}

	if (softwareDeveloperTin) {
		commands.push(printCenter(softwareDeveloperTin));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (posAccreditationNumber) {
		commands.push(printCenter(`Acc No: ${posAccreditationNumber}`));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (posAccreditationDate) {
		commands.push(printCenter(`Date Issued: ${posAccreditationDate}`));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(EscPosCommands.LINE_BREAK);

	if (ptuNumber) {
		commands.push(printCenter(`PTU No: ${ptuNumber}`));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (ptuDate) {
		commands.push(printCenter(`Date Issued: ${ptuDate}`));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	return commands;
};

const printLeftRight = (leftText: string, rightText: string) => {
	const leftTextLength = leftText.length;
	const rightTextLength = rightText.length;

	const spacesNeeded =
		PAPER_CHARACTER_WIDTH - (leftTextLength + rightTextLength);

	const spaces = ' '.repeat(Math.max(0, spacesNeeded));

	return leftText + spaces + rightText;
};

export const printCenter = (text: string) => {
	console.group();
	const textLength = text.length;

	console.log('textLength', textLength);

	const spacesNeeded = PAPER_CHARACTER_WIDTH - textLength;

	console.log('spacesNeeded', spacesNeeded);

	const spaces = ' '.repeat(Math.max(0, spacesNeeded) / 2);

	console.log('spaces', spaces);
	console.log('final', spaces + text + spaces);
	console.log('final length', (spaces + text).length);

	console.groupEnd();

	return spaces + text;
};

export const printRight = (text: string) => {
	const textLength = text.length;

	const spacesNeeded = PAPER_CHARACTER_WIDTH - textLength;

	const spaces = ' '.repeat(Math.max(0, spacesNeeded));

	return spaces + text;
};

type ItemBlockItemsCommands = Omit<
	ItemBlockItems,
	'labelStyle' | 'contentStyle'
>;
export const generateItemBlockCommands = (items: ItemBlockItemsCommands[]) => {
	const commands: string[] = [];

	items.forEach((item) => {
		let label = item.label;
		if (item.isIndented) {
			label = `  ${label}`;
		}

		let value = String(item.value);
		if (item.isParenthesized) {
			value = `(${value})`;
		}

		commands.push(printLeftRight(label, value));
		commands.push(EscPosCommands.LINE_BREAK);
	});

	return commands;
};
