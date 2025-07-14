import dayjs from 'dayjs';
import { formatDate, formatTime } from '../../../utils';
import { SiteSettings } from '../../../types';
import { DailyItemSoldSummary } from '../../../components/modals/ViewDailyItemSoldModal';
import {
	generateReceiptFooterCommands,
	generateReceiptHeaderCommands,
	printCenter,
} from '../../helper-escpos';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintDailyItemSold } from './types';

export const printDailyItemSoldNative = ({
	dailyItemSoldSummary,
	siteSettings,
}: PrintDailyItemSold): string[] => [
	...generateDailyItemSoldContentCommands(dailyItemSoldSummary, siteSettings),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateDailyItemSoldContentCommands = (
	dailyItemSoldSummary: DailyItemSoldSummary[],
	siteSettings: SiteSettings,
): string[] => {
	const currentDate = dayjs();
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommands({
			title: 'DAILY ITEM SOLD',
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
	commands.push(`Date: ${formatDate(currentDate)}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(`Time: ${formatTime(currentDate)}`);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	// Footer
	commands.push(...generateReceiptFooterCommands(siteSettings));

	return commands;
};
