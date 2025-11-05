import { formatDateTime, formatQuantity, getFullName } from '../../../utils';
import { EMPTY_CELL } from '../../../globals';
import {
	generateItemBlockCommands,
	generateReceiptHeaderCommandsV2,
	printCenter,
} from '../../helper-escpos';
import { EscPosCommands } from '../../utils/escpos.enum';
import { PrintAdjustmentSlip } from './types';
import dayjs from 'dayjs';

export const printAdjustmentSlipNative = ({
	adjustmentSlip,
}: PrintAdjustmentSlip): string[] => [
	...generateAdjustmentSlipContentCommands(adjustmentSlip),
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
	EscPosCommands.LINE_BREAK,
];

const generateAdjustmentSlipContentCommands = (
	adjustmentSlip: PrintAdjustmentSlip['adjustmentSlip'],
): string[] => {
	const commands: string[] = [];

	// Header
	commands.push(
		...generateReceiptHeaderCommandsV2({
			branchHeader: adjustmentSlip.branch,
			title: 'ADJUSTMENT SLIP',
		}),
	);

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('Datetime Requested:'));
	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter(formatDateTime(adjustmentSlip.datetime_created)));
	commands.push(EscPosCommands.LINE_BREAK);

	// Details
	commands.push(
		...generateItemBlockCommands([
			{
				label: 'Adjustment Slip ID',
				value: adjustmentSlip.reference_number || EMPTY_CELL,
			},
			{
				label: 'Branch',
				value: adjustmentSlip.branch?.name || 'N/A',
			},
			{
				label: 'Encoded By',
				value: getFullName(adjustmentSlip.encoded_by),
			},
			{
				label: 'Date & Time Created',
				value: formatDateTime(adjustmentSlip.datetime_created),
			},
		]),
	);

	commands.push(printCenter('----------------------------------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	// Products
	adjustmentSlip.products?.forEach((product, index) => {
		const productName = `${product?.branch_product?.product.name}${
			product?.branch_product?.product?.is_vat_exempted ? ' - VE' : ' - V'
		}`;

		commands.push(productName);
		commands.push(EscPosCommands.LINE_BREAK);

		const adjustmentText = `${product.adjusted_value >= 0 ? '+' : ''} ${formatQuantity(
			product.adjusted_value,
			product?.branch_product?.product,
		)}`;

		const reasonText =
			product.error_remarks && product.error_remarks !== 'N/A'
				? ` Error - ${product.error_remarks}`
				: ` ${product.remarks && product.remarks !== 'N/A' ? product.remarks : 'Spoilage'}`;

		commands.push(`  ${adjustmentText}${reasonText}`);
		commands.push(EscPosCommands.LINE_BREAK);

		if (index < adjustmentSlip.products.length - 1) {
			commands.push(EscPosCommands.LINE_BREAK);
		}
	});

	commands.push(EscPosCommands.LINE_BREAK);
	commands.push(printCenter('----------------------------------------'));
	commands.push(EscPosCommands.LINE_BREAK);

	// Print details
	commands.push(
		printCenter(`Print Details: ${dayjs().format('MM/DD/YYYY h:mmA')}`),
	);
	commands.push(EscPosCommands.LINE_BREAK);

	// Overall remarks
	if (adjustmentSlip.remarks) {
		commands.push(printCenter(`Overall Remarks: ${adjustmentSlip.remarks}`));
		commands.push(EscPosCommands.LINE_BREAK);
	}

	return commands;
};
