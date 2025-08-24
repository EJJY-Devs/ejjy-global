import dayjs from 'dayjs';
import { Branch, BranchMachine } from '../../../types';
import { DailyItemSoldSummary } from '../../../components/modals/ViewDailyItemSoldModal';
import {
	generateReceiptHeaderCommands,
	printCenter,
	printRight,
} from '../../helper-escpos';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintDailyItemSold } from './types';

export const printDailyItemSoldNative = ({
	dailyItemSoldSummary,
	branch,
	branchMachine,
}: PrintDailyItemSold): string[] => [
	...generateDailyItemSoldContentCommands(
		dailyItemSoldSummary,
		branch,
		branchMachine,
	),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateDailyItemSoldContentCommands = (
	dailyItemSoldSummary: DailyItemSoldSummary[],
	branch: Branch | undefined,
	branchMachine: BranchMachine | undefined,
): string[] => {
	const currentDate = dayjs();
	const currentDateTime = currentDate.format('MM/DD/YYYY hh:mm A');
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine,
			branchHeader: branch,
			title: 'DAILY ITEM SOLD',
		}),
	);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	if (dailyItemSoldSummary.length === 0) {
		commands.push(...printCenter('No items sold today'));
	} else {
		// Table Header
		const nameHeader = 'Name';
		const quantityHeader = 'Quantity';
		const maxNameLength = 25;
		const paddedNameHeader = nameHeader.padEnd(maxNameLength);
		const headerLine = `${paddedNameHeader} ${quantityHeader.padStart(8)}`;
		commands.push(headerLine);
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(printRight('----------------------------------------'));
		commands.push(EscPosCommands.LINE_BREAK);

		// Item list
		dailyItemSoldSummary.forEach((item) => {
			const name = item.name || '';
			const quantity = item.quantity?.toLocaleString() || '0';

			// Format: "Name                     Qty"
			const paddedName =
				name.length > maxNameLength
					? name.substring(0, maxNameLength - 3) + '...'
					: name.padEnd(maxNameLength);

			const line = `${paddedName} ${quantity.padStart(8)}`;
			commands.push(line);
			commands.push(EscPosCommands.LINE_BREAK);
		});
	}

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter(`PDT: ${currentDateTime}`));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
