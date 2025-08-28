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

	if (branchInfo?.name) {
		commands.push(printCenter(branchInfo.name));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (title) {
		commands.push(EscPosCommands.LINE_BREAK);
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

	// Initialize and set center alignment for header
	commands.push(EscPosCommands.ALIGN_CENTER);
	commands.push(EscPosCommands.TEXT_SMALL); // Ensure small font for header

	if (branchInfo?.store_name) {
		commands.push(EscPosCommands.BOLD_ON);
		for (const line of branchInfo.store_name.split('\n')) {
			commands.push(line); // Let ESC/POS center alignment handle it
		}
		commands.push(EscPosCommands.BOLD_OFF);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branchInfo?.store_address) {
		for (const line of branchInfo.store_address.split('\n')) {
			commands.push(line); // Let ESC/POS center alignment handle it
		}
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branchInfo?.contact_number || name) {
		commands.push(
			[branchInfo?.contact_number, name].filter(Boolean).join(' | '),
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branchInfo?.proprietor) {
		commands.push(branchInfo.proprietor); // Let ESC/POS center alignment handle it
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (branchInfo?.vat_type || branchInfo?.tin) {
		commands.push(
			[getTaxTypeDescription(branchInfo?.vat_type), branchInfo?.tin]
				.filter(Boolean)
				.join(' | '), // Let ESC/POS center alignment handle it
		);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (machineID) {
		commands.push(`MIN: ${machineID}`); // Let ESC/POS center alignment handle it
		commands.push(EscPosCommands.LINE_BREAK);
	}
	if (posTerminal) {
		commands.push(`SN: ${posTerminal}`); // Let ESC/POS center alignment handle it
		commands.push(EscPosCommands.LINE_BREAK);
	}
	if (permit_to_use) {
		commands.push(`PTU No: ${permit_to_use}`); // Let ESC/POS center alignment handle it
		commands.push(EscPosCommands.LINE_BREAK);
	}
	if (ptuDateIssued) {
		commands.push(`Date Issued: ${ptuDateIssued}`); // Let ESC/POS center alignment handle it
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (title) {
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(EscPosCommands.BOLD_ON);
		commands.push(title); // Let ESC/POS center alignment handle it
		commands.push(EscPosCommands.BOLD_OFF);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	// Reset to left alignment for content
	commands.push(EscPosCommands.ALIGN_LEFT);

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

	// Set center alignment for footer
	commands.push(EscPosCommands.ALIGN_CENTER);

	if (softwareDeveloper) {
		commands.push(softwareDeveloper);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (softwareDeveloperAddress) {
		const lines = softwareDeveloperAddress.split('\n');
		for (const line of lines) {
			commands.push(line);
		}
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (softwareDeveloperTin) {
		commands.push(softwareDeveloperTin);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (posAccreditationNumber) {
		commands.push(`Acc No: ${posAccreditationNumber}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	if (posAccreditationDate) {
		commands.push(`Date Issued: ${posAccreditationDate}`);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	// Reset to left alignment
	commands.push(EscPosCommands.ALIGN_LEFT);

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

	// Manually center the text using spaces
	const result = lines
		.map((line) => {
			const padding = Math.floor((PAPER_CHARACTER_WIDTH - line.length) / 2);
			return ' '.repeat(padding) + line;
		})
		.join('\n');

	return result;
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

		// Ensure minimum spacing between label and value
		const minSpacing = 3;
		const maxLabelLength = PAPER_CHARACTER_WIDTH - value.length - minSpacing;

		if (label.length <= maxLabelLength) {
			// Single line: label + spaces + value (right-aligned)
			const spacesNeeded = PAPER_CHARACTER_WIDTH - label.length - value.length;
			const space = ' '.repeat(Math.max(minSpacing, spacesNeeded));
			const line = label + space + value;
			commands.push(line);
		} else {
			// Multi-line: label first, then value right-aligned
			commands.push(label);
			commands.push(EscPosCommands.LINE_BREAK);
			const valueIndent = ' '.repeat(
				Math.max(0, PAPER_CHARACTER_WIDTH - value.length),
			);
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
