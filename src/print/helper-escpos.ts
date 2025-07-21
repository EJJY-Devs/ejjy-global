import { ReceiptHeaderProps } from '../components';
import { ItemBlockItems } from '../components/Printing/ItemBlock';
import { SiteSettings } from '../types';
import { getTaxTypeDescription } from '../utils';
import { EscPosCommands } from './utils/escpos.enum';

const PAPER_CHARACTER_WIDTH = 40;

export const generateReceiptHeaderCommandsV2 = ({
	branchMachine,
	title,
	branchHeader,
}: ReceiptHeaderProps) => {
	const { branch } = branchMachine || {};
	const branchInfo = branch ?? branchHeader;

	const commands: string[] = [];

	if (branchInfo?.store_name) {
		const lines = branchInfo.store_name.split('\n');
		for (const line of lines) {
			commands.push(printCenter(line));
		}
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (title) {
		commands.push('\x0A');
		commands.push('\x0A');
		commands.push(printCenter(title));
	}

	return commands;
};

export const generateReceiptHeaderCommands = ({
	branchMachine,
	title,
	branchHeader,
}: ReceiptHeaderProps) => {
	const {
		name,
		machine_identification_number: machineID,
		pos_terminal: posTerminal,
		branch,
		ptu_date_issued: ptuDateIssued,
		permit_to_use,
	} = branchMachine || {};

	const branchInfo = branch ?? branchHeader;
	const commands: string[] = [];

	if (branchInfo?.store_name) {
		for (const line of branchInfo.store_name.split('\n')) {
			commands.push(printCenter(line));
		}
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branchInfo?.store_address) {
		for (const line of branchInfo.store_address.split('\n')) {
			commands.push(printCenter(line));
		}
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branchInfo?.contact_number || name) {
		commands.push(
			printCenter(
				[branchInfo?.contact_number, name].filter(Boolean).join(' | '),
			),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branchInfo?.proprietor) {
		commands.push(printCenter(branchInfo.proprietor));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branchInfo?.vat_type || branchInfo?.tin) {
		commands.push(
			printCenter(
				[getTaxTypeDescription(branchInfo?.vat_type), branchInfo?.tin]
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
	}

	if (softwareDeveloperAddress) {
		const lines = softwareDeveloperAddress.split('\n');
		for (const line of lines) {
			commands.push(printCenter(line));
		}
	}

	if (softwareDeveloperTin) {
		commands.push(printCenter(softwareDeveloperTin));
	}

	if (posAccreditationNumber) {
		commands.push(printCenter(`Acc No: ${posAccreditationNumber}`));
	}

	if (posAccreditationDate) {
		commands.push(printCenter(`Date Issued: ${posAccreditationDate}`));
	}

	// Feed extra lines at the end
	commands.push('\x1B\x64\x02'); // ESC d 2 — feed 2 lines

	return commands;
};

export const printCenter = (text: string): string => {
	const words = text.split(' ');
	const lines: string[] = [];
	let currentLine = '';

	for (const word of words) {
		if ((currentLine + ' ' + word).trim().length <= PAPER_CHARACTER_WIDTH) {
			currentLine += (currentLine ? ' ' : '') + word;
		} else {
			lines.push(currentLine.trim());
			currentLine = word;
		}
	}

	if (currentLine) {
		lines.push(currentLine.trim());
	}

	return lines.join('\n');
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
		if (item.isIndented) label = `  ${label}`;

		let value = String(item.value);
		if (item.isParenthesized) value = `(${value})`;

		const spaceBetween = 2;
		const combinedLength = label.length + value.length + spaceBetween;

		if (combinedLength <= PAPER_CHARACTER_WIDTH) {
			// Single line: label + value with spacing
			const space = ' '.repeat(
				PAPER_CHARACTER_WIDTH - label.length - value.length,
			);
			commands.push(label + space + value);
		} else {
			// Multi-line: label first, then value right-aligned
			const valueIndent = ' '.repeat(PAPER_CHARACTER_WIDTH - value.length);
			commands.push(label);
			commands.push(EscPosCommands.LINE_BREAK);
			commands.push(valueIndent + value);
		}

		commands.push(EscPosCommands.LINE_BREAK);
	});

	return commands;
};

export const generateThreeColumnLine = (
	leftText: string,
	centerText: string,
	rightText: string,
): string => {
	const totalWidth = PAPER_CHARACTER_WIDTH;

	// Reserve space for center and right columns
	const rightWidth = Math.max(rightText.length, 8); // minimum 8 chars for quantity
	const centerWidth = Math.max(centerText.length, 4); // minimum 4 chars for unit
	const leftWidth = totalWidth - rightWidth - centerWidth - 2; // 2 spaces for padding

	// Truncate left text if it's too long
	const truncatedLeft =
		leftText.length > leftWidth
			? leftText.substring(0, leftWidth - 1) + ''
			: leftText;

	// Pad the columns
	const leftPadded = truncatedLeft.padEnd(leftWidth);
	const centerPadded = centerText.padEnd(centerWidth);
	const rightPadded = rightText.padStart(rightWidth);

	return leftPadded + centerPadded + rightPadded;
};
