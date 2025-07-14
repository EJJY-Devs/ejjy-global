import dayjs from 'dayjs';
import { BranchMachine } from '../../../types';
import { DailyItemSoldSummary } from '../../../components/modals/ViewDailyItemSoldModal';
import {
	generateReceiptHeaderCommands,
	printCenter,
} from '../../helper-escpos';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintDailyItemSold } from './types';

export const printDailyItemSoldNative = ({
	dailyItemSoldSummary,
	branchMachine,
}: PrintDailyItemSold): string[] => [
	...generateDailyItemSoldContentCommands(dailyItemSoldSummary, branchMachine),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateDailyItemSoldContentCommands = (
	dailyItemSoldSummary: DailyItemSoldSummary[],
	branchMachine: BranchMachine | undefined,
): string[] => {
	const currentDate = dayjs();
	const currentDateTime = currentDate.format('MM/DD/YYYY hh:mm A [PDT]');
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			branchMachine,
			title: 'DAILY ITEM SOLD SUMMARY',
		}),
	);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	if (dailyItemSoldSummary.length === 0) {
		commands.push(...printCenter('No items sold today'));
	} else {
		// Item list
		dailyItemSoldSummary.forEach((item) => {
			const name = item.name || '';
			const quantity = item.quantity?.toLocaleString() || '0';

			// Format: "Name                     Qty"
			const maxNameLength = 25;
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
	commands.push(`PDT: ${currentDateTime}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
