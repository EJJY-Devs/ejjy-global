import dayjs from 'dayjs';
import { Branch, BranchMachine } from '../../../types';
import { UnsoldItemSummary } from './types';
import {
	generateItemBlockCommands,
	generateReceiptHeaderCommandsV2,
	printCenter,
	printRight,
} from '../../helper-escpos';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintUnsoldItem } from './types';

export const printUnsoldItemNative = ({
	unsoldItemSummary,
	branch,
	branchMachine,
	reportDate,
}: PrintUnsoldItem): string[] => [
	...generateUnsoldItemContentCommands(
		unsoldItemSummary,
		branch,
		branchMachine,
		reportDate,
	),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateUnsoldItemContentCommands = (
	unsoldItemSummary: UnsoldItemSummary[],
	branch: Branch | undefined,
	branchMachine: BranchMachine | undefined,
	reportDate?: string,
): string[] => {
	const currentDate = dayjs();
	const currentDateTime = currentDate.format('MM/DD/YYYY hh:mm A');

	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommandsV2({
			branchMachine,
			branchHeader: branch,
			title: 'UNSOLD ITEM',
		}),
	);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter(reportDate || currentDate.format('MM/DD/YYYY')));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	if (unsoldItemSummary.length === 0) {
		commands.push(...printCenter('No unsold items today'));
	} else {
		// Table Header
		commands.push(
			...generateItemBlockCommands([{ label: 'Name', value: 'Quantity' }]),
		);
		commands.push(printRight('----------------------------------------'));
		commands.push(EscPosCommands.LINE_BREAK);

		// Item list
		unsoldItemSummary.forEach((item) => {
			const name = item.name || '';
			const quantity = item.quantity?.toLocaleString() || '0';

			commands.push(
				...generateItemBlockCommands([{ label: name, value: quantity }]),
			);
		});
	}

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter(`PDT: ${currentDateTime}`));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
