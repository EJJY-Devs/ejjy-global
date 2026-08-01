import dayjs from 'dayjs';
import { REPRINT_ONLY_MESSAGE } from '../../../globals';
import { DeliveryInvoice, SiteSettings } from '../../../types';
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
	const commands: string[] = [EscPosCommands.INITIALIZE, '\n'];

	try {
		commands.push(
			...generateDeliveryInvoiceContentCommands(
				deliveryInvoice,
				siteSettings,
				isReprint,
			),
		);

		commands.push(
			EscPosCommands.LINE_BREAK,
			EscPosCommands.LINE_BREAK,
			EscPosCommands.FEED_LINES,
		);

		return commands;
	} catch (error) {
		console.error('Error generating delivery invoice commands:', error);
		return [
			EscPosCommands.INITIALIZE,
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

	const totalAmount =
		deliveryInvoice?.products?.reduce(
			(sum, item) =>
				sum + Number(item.quantity) * Number(item.price_per_piece || 0),
			0,
		) || 0;

	try {
		commands.push(
			...generateReceiptHeaderCommands({
				branchMachine: deliveryInvoice.branch_machine,
				title: 'DELIVERY INVOICE',
			}),
		);

		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(EscPosCommands.ALIGN_LEFT);

		deliveryInvoice.products.forEach((item) => {
			const productName = item.product?.print_details || item.product?.name;
			const quantityAndPrice = `   ${item.quantity} @ ${formatInPeso(item.price_per_piece, PESO_SIGN)}`;
			const amount = formatInPeso(
				Number(item.quantity) * Number(item.price_per_piece),
				PESO_SIGN,
			);

			commands.push(productName);
			commands.push(EscPosCommands.LINE_BREAK);

			commands.push(
				...generateItemBlockCommands([
					{
						label: quantityAndPrice,
						value: amount,
						isIndented: true,
					},
				]),
			);
		});

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

		commands.push(EscPosCommands.LINE_BREAK);
		commands.push('GDT: ' + formatDateTime(deliveryInvoice.created_at));
		commands.push(EscPosCommands.LINE_BREAK);
		commands.push('PDT: ' + formatDateTime(dayjs(), false));
		commands.push(EscPosCommands.LINE_BREAK);

		commands.push(
			...generateItemBlockCommands([
				{
					label: deliveryInvoice.or_number || EMPTY_CELL,
					value: `${deliveryInvoice.products.length} item(s)`,
				},
			]),
		);

		commands.push(EscPosCommands.LINE_BREAK);
		commands.push(...generateReceiptFooterCommands(siteSettings));

		commands.push(EscPosCommands.ALIGN_CENTER);

		if (isReprint) {
			commands.push(REPRINT_ONLY_MESSAGE);
			commands.push(EscPosCommands.LINE_BREAK);
		}

		commands.push(`${siteSettings?.thank_you_message}`);
		commands.push(EscPosCommands.LINE_BREAK);

		return commands;
	} catch (error) {
		console.error('Error generating delivery invoice content:', error);
		return [
			EscPosCommands.ALIGN_LEFT,
			'Error generating delivery invoice content',
			EscPosCommands.LINE_BREAK,
		];
	}
};
