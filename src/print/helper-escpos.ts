import { ReceiptHeaderProps } from '../components';
import { ItemBlockItems } from '../components/Printing/ItemBlock';
import { SiteSettings } from '../types';
import { getTaxTypeDescription } from '../utils';
import { EscPosCommands } from './utils/escpos.enum';

const PAPER_CHARACTER_WIDTH = 40;

export const generateReceiptHeaderCommands = ({
	branchMachine,
	title,
}: ReceiptHeaderProps) => {
	const {
		name,
		machine_identification_number: machineID,
		pos_terminal: posTerminal,
		branch,
		ptu_date_issued: ptuDateIssued,
		permit_to_use,
	} = branchMachine || {};

	const commands: string[] = [];

	if (branch?.store_name) {
		const lines = branch?.store_name.split('\n');
		for (const line of lines) {
			commands.push(printCenter(line));
			commands.push(EscPosCommands.LINE_BREAK);
		}
	}

	if (branch?.store_address) {
		const lines = branch?.store_address.split('\n');
		for (const line of lines) {
			commands.push(printCenter(line));
			commands.push(EscPosCommands.LINE_BREAK);
		}
	}

	if (branch?.contact_number || name) {
		commands.push(
			printCenter([branch?.contact_number, name].filter(Boolean).join(' | ')),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branch?.proprietor) {
		commands.push(printCenter(branch?.proprietor));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branch?.vat_type || branch?.tin) {
		commands.push(
			printCenter(
				[getTaxTypeDescription(branch?.vat_type), branch?.tin]
					.filter(Boolean)
					.join(' | '),
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
	if (permit_to_use) {
		commands.push(printCenter(`PTU No: ${permit_to_use}`));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (ptuDateIssued) {
		commands.push(printCenter(`Date Issued: ${ptuDateIssued}`));
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
	const textLength = text.length;
	const spacesNeeded = PAPER_CHARACTER_WIDTH - textLength;
	const spaces = '\u0020'.repeat(Math.max(0, Math.floor(spacesNeeded / 2)));
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
