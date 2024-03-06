import dayjs from 'dayjs';
import {
	BranchMachine,
	DailySales,
	GeneratedByUser,
	SiteSettings,
} from '../../types';
import {
	ReportTextFile,
	formatDate,
	formatDateTime,
	formatInPeso,
} from '../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../helper-receipt';
import { writeFooter, writeHeader } from '../helper-txt';

export const createDailySalesTxt = (
	dailySales: DailySales,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	user: GeneratedByUser,
) => {
	const reportTextFile = new ReportTextFile();
	let rowNumber = 0;

	rowNumber = writeHeader(
		reportTextFile,
		siteSettings,
		branchMachine,
		rowNumber,
	);
	rowNumber += 1;

	reportTextFile.write({
		text: 'DAILY SALES',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `For ${formatDate(dailySales.daily_sales_data.date)}`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	rowNumber += 1;

	reportTextFile.write({
		text: 'CASH SALES',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.cash_sales, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'CREDIT SALES',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.credit_pay, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'GROSS SALES',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.gross_sales, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	rowNumber += 1;

	reportTextFile.write({
		text: 'VAT Exempt',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.vat_exempt, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'VATable Sales',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.vat_sales, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'VAT Amount (12%)',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.vat_amount, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'ZERO Rated',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(0, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '----------------',
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'GROSS SALES',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.gross_sales, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '   REG. DISCOUNT',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `(${formatInPeso(dailySales.regular_discount, PESO_SIGN)})`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '   Special',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `(${formatInPeso(dailySales.special_discount, PESO_SIGN)})`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '   VOIDED SALES',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `(${formatInPeso(dailySales.void, PESO_SIGN)})`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '   VAT AMOUNT (12%)',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `(${formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN)})`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'NET SALES',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `(${formatInPeso(dailySales.net_sales, PESO_SIGN)})`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '----------------',
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'ADJUSTMENT ON VAT:',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '   Special',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.vat_special_discount, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '   OTHERS',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.others, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '   TOTAL',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: '----------------',
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'VAT AMOUNT (12%)',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.vat_amount, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'VAT ADJ.',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `(${formatInPeso(dailySales.total_vat_adjusted, PESO_SIGN)})`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'VAT PAYABLE',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(dailySales.vat_payable, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	rowNumber += 1;

	reportTextFile.write({
		text: `GDT: ${formatDateTime(dailySales.daily_sales_data.date)}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `PDT: ${formatDateTime(dayjs(), false)}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `C: ${dailySales?.generated_by?.employee_id || EMPTY_CELL}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `PB: ${user?.employee_id || EMPTY_CELL}`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});

	rowNumber += 1;

	rowNumber += 1;

	writeFooter(reportTextFile, siteSettings, rowNumber);

	reportTextFile.export(`DailySales_${dailySales.id}.txt`);

	return null;
};
