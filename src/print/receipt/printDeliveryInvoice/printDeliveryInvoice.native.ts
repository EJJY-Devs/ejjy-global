import dayjs from 'dayjs';
import { SiteSettings, DeliveryInvoice } from '../../../types';
import { formatDateTime, formatInPeso } from '../../../utils';
import {
	generateItemBlockCommands,
	generateReceiptFooterCommands,
	generateReceiptHeaderCommands,
	printRight,
} from '../../helper-escpos';
import { EMPTY_CELL, PESO_SIGN } from '../../helper-receipt';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintDeliveryInvoice } from './types';

export const printDeliveryInvoiceNative = ({
	deliveryInvoice,
	siteSettings,
	isReprint = false,
}: PrintDeliveryInvoice) => {
	const commands: string[] = [
		EscPosCommands.INITIALIZE, // Reset printer to known state
		'\n', // Small buffer after initialize
	];

	try {
		// Generate content with error handling
		const contentCommands = generateDeliveryInvoiceContentCommands(
			deliveryInvoice,
			siteSettings,
			isReprint,
		);

		// Add spacing before content to prevent buffer overflow
		commands.push(...contentCommands);

		// Simple ending with paper feed
		commands.push(
			EscPosCommands.LINE_BREAK,
			EscPosCommands.LINE_BREAK,
			EscPosCommands.FEED_LINES, // Ensure paper feeds out
		);

		return commands;
	} catch (error) {
		console.error('Error generating delivery invoice commands:', error);
		// Return minimal commands to prevent complete failure
		return [
			EscPosCommands.INITIALIZE, // Reset printer even on error
			'Error generating invoice content',
			EscPosCommands.LINE_BREAK,
			EscPosCommands.LINE_BREAK,
		];
	}
};

const generateDeliveryInvoiceContentCommands = (
	deliveryInvoice: DeliveryInvoice,
	siteSettings: SiteSettings,
	isReprint: boolean,
) => {
	const commands: string[] = [];

	try {
		commands.push(
			...generateReceiptHeaderCommands({
				branchMachine: deliveryInvoice.branch_machine,
				title: 'DELIVERY INVOICE',
			}),
		);

		commands.push(EscPosCommands.LINE_BREAK);

		// Reset to left alignment for delivery invoice details
		commands.push(EscPosCommands.ALIGN_LEFT);

		// Products - Process in smaller chunks to prevent buffer overflow
		let totalAmount = 0;

		deliveryInvoice.products.forEach((item) => {
			const quantityAndPrice = `   ${item.quantity} @ ${formatInPeso(item.price_per_piece, PESO_SIGN)}`;
			const lineTotal = Number(item.quantity) * Number(item.price_per_piece);
			totalAmount += lineTotal;

			commands.push(item.product.name);
			commands.push(EscPosCommands.LINE_BREAK);

			commands.push(
				...generateItemBlockCommands([
					{
						label: quantityAndPrice,
						value: formatInPeso(lineTotal, PESO_SIGN),
						isIndented: true,
					},
				]),
			);
		});

		// Divider
		commands.push(printRight('----------------'));
		commands.push(EscPosCommands.LINE_BREAK);

		commands.push(
			...generateItemBlockCommands([
				{
					label: 'TOTAL AMOUNT',
					value: formatInPeso(totalAmount, PESO_SIGN),
				},
			]),
		);

		// Add GDT and PDT
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push('GDT: ' + formatDateTime(deliveryInvoice.created_at));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push('PDT: ' + formatDateTime(dayjs(), false));
		commands.push(EscPosCommands.LINE_BREAK);

		// OR Number and Item Count
		commands.push(
			...generateItemBlockCommands([
				{
					label: deliveryInvoice.or_number || EMPTY_CELL,
					value: `${deliveryInvoice.products.length} item(s)`,
				},
			]),
		);

		// Footer
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(...generateReceiptFooterCommands(siteSettings));

		commands.push(EscPosCommands.ALIGN_CENTER);

		// Final Messages
		if (isReprint) {
			commands.push('REPRINT ONLY');
			commands.push(EscPosCommands.LINE_BREAK);
		}

		commands.push(`${siteSettings?.thank_you_message}`);
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(EscPosCommands.LINE_BREAK);

		return commands;
	} catch (error) {
		console.error('Error generating delivery invoice content:', error);
		// Return minimal commands to prevent complete failure
		return [
			EscPosCommands.ALIGN_LEFT,
			'Error generating delivery invoice content',
			EscPosCommands.LINE_BREAK,
		];
	}
};
