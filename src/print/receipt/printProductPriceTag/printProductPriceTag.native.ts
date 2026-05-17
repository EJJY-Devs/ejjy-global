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
	const nameLines = nameText.split('\n');
	const hasMultipleLines = nameLines.length > 1;

	commands.push(EscPosCommands.INITIALIZE);

	// Use double height for single-line names; normal size for multi-line so price is not cut off
	if (!hasMultipleLines) {
		commands.push(EscPosCommands.TEXT_DOUBLE_HEIGHT);
	}

	for (const line of nameLines) {
		commands.push(line);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	// Price — double height, normal width (letters stay close together)
	commands.push(EscPosCommands.TEXT_DOUBLE_HEIGHT);
	commands.push(price);
	commands.push(EscPosCommands.LINE_BREAK);

	// Reset
	commands.push(EscPosCommands.TEXT_NORMAL_SIZE);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);

	return commands;
};
