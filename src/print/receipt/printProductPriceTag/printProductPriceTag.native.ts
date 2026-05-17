import { Product, SiteSettings } from '../../../types';
import { formatInPeso } from '../../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PaperSettings } from './types';

export const printProductPriceTagNative = (
	product: Product,
	_siteSettings: SiteSettings,
	_paperSettings: PaperSettings,
): string[] => {
	const commands: string[] = [];

	const nameText = product.price_tag_print_details || EMPTY_CELL;
	const price = formatInPeso(product.price_per_piece, PESO_SIGN);

	// Initialize printer
	commands.push(EscPosCommands.INITIALIZE);

	// Print name lines
	const nameLines = nameText.split('\n');
	for (const line of nameLines) {
		commands.push(line);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	// Print price — right-aligned, double size
	commands.push(EscPosCommands.TEXT_DOUBLE);
	commands.push(EscPosCommands.ALIGN_RIGHT);
	commands.push(price);
	commands.push(EscPosCommands.LINE_BREAK);

	// Reset
	commands.push(EscPosCommands.TEXT_NORMAL_SIZE);
	commands.push(EscPosCommands.ALIGN_LEFT);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
