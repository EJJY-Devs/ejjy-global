import { Product, SiteSettings } from '../../../types';
import { formatInPeso } from '../../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PaperSettings } from './types';

// Default ESC/POS line spacing is 1/6 inch (~4.23mm) per line at normal
// character height; double-height text takes roughly twice that.
const LINE_HEIGHT_MM = 4.23;

export const printProductPriceTagNative = (
	product: Product,
	_siteSettings: SiteSettings,
	paperSettings: PaperSettings,
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

	let usedHeightMm = hasMultipleLines
		? nameLines.length * LINE_HEIGHT_MM
		: 2 * LINE_HEIGHT_MM;

	for (const line of nameLines) {
		commands.push(line);
		commands.push(EscPosCommands.LINE_BREAK);
	}

	// Price — double height, normal width (letters stay close together)
	commands.push(EscPosCommands.TEXT_DOUBLE_HEIGHT);
	commands.push(price);
	commands.push(EscPosCommands.LINE_BREAK);
	usedHeightMm += 2 * LINE_HEIGHT_MM;

	// Reset
	commands.push(EscPosCommands.TEXT_NORMAL_SIZE);

	// Feed exactly enough to fill out the configured tag height so the next
	// tag's content starts on the next physical tag instead of drifting out
	// of alignment with the die-cut boundaries.
	const remainingMm = Math.max(0, paperSettings.paperHeight - usedHeightMm);
	const feedLines = Math.max(1, Math.round(remainingMm / LINE_HEIGHT_MM));
	for (let i = 0; i < feedLines; i += 1) {
		commands.push(EscPosCommands.LINE_BREAK);
	}

	return commands;
};
