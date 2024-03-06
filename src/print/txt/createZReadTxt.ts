import {
	BranchMachine,
	GeneratedByUser,
	SiteSettings,
	ZReadReport,
} from '../../types';
import { ReportTextFile, formatDateTime, formatInPeso } from '../../utils';
import { EMPTY_CELL, PESO_SIGN, UNDERLINE_TEXT } from '../helper-receipt';
import { writeFooter, writeHeader } from '../helper-txt';

export const createZReadTxt = (
	report: ZReadReport,
	siteSettings: SiteSettings,
	branchMachine: BranchMachine,
	user: GeneratedByUser,
	returnContent = false,
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

	if (report.total_transactions === 0) {
		rowNumber += 1;
		reportTextFile.write({
			text: 'NO TRANSACTION',
			alignment: ReportTextFile.ALIGNMENTS.CENTER,
			rowNumber,
		});
		rowNumber += 1;
		rowNumber += 1;
	}

	reportTextFile.write({
		text: 'Z-READ',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	rowNumber += 1;

	reportTextFile.write({
		text: 'INVOICE NUMBER',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: `   Beg Invoice #: ${report.beginning_or?.or_number || EMPTY_CELL}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: `   End Invoice #: ${report.ending_or?.or_number || EMPTY_CELL}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'SALES',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: `   Beg: ${formatInPeso(report.beginning_sales, PESO_SIGN)}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: `   Cur: ${formatInPeso(report.current_sales, PESO_SIGN)}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: `   End: ${formatInPeso(report.ending_sales, PESO_SIGN)}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'TRANSACTION COUNT',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: `   Beg: ${report.beginning_transactions_count}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: `   Cur: ${report.total_transactions}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;
	reportTextFile.write({
		text: `   End: ${report.ending_transactions_count}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	rowNumber += 1;

	reportTextFile.write({
		text: 'ACCUMULATED SALES BREAKDOWN',
		alignment: ReportTextFile.ALIGNMENTS.CENTER,
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
		text: `${formatInPeso(report.cash_sales, PESO_SIGN)} `,
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
		text: `${formatInPeso(report.credit_pay, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	if (Number(report.credit_pay) > 0) {
		reportTextFile.write({
			text: UNDERLINE_TEXT,
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;
	}

	reportTextFile.write({
		text: 'GROSS SALES',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(report.gross_sales, PESO_SIGN)} `,
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
		text: `${formatInPeso(report.vat_exempt, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: 'VAT Sales',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(report.vat_sales, PESO_SIGN)} `,
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
		text: `${formatInPeso(report.vat_amount, PESO_SIGN)} `,
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
		text: `${formatInPeso(report.gross_sales, PESO_SIGN)} `,
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
		text: `(${formatInPeso(report.regular_discount, PESO_SIGN)})`,
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
		text: `(${formatInPeso(report.special_discount, PESO_SIGN)})`,
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
		text: `(${formatInPeso(report.void, PESO_SIGN)})`,
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
		text: `(${formatInPeso(report.total_vat_adjusted, PESO_SIGN)})`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	if (Number(report.vat_amount) > 0) {
		reportTextFile.write({
			text: UNDERLINE_TEXT,
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;
	}

	reportTextFile.write({
		text: 'ACCUM. GRAND TOTAL',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(report.net_sales, PESO_SIGN)}`,
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
		text: `${formatInPeso(report.vat_special_discount, PESO_SIGN)} `,
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
		text: `${formatInPeso(report.others, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	if (Number(report.others) > 0) {
		reportTextFile.write({
			text: UNDERLINE_TEXT,
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;
	}

	reportTextFile.write({
		text: '   TOTAL',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(report.total_vat_adjusted, PESO_SIGN)} `,
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
		text: `${formatInPeso(report.vat_amount, PESO_SIGN)} `,
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
		text: `(${formatInPeso(report.total_vat_adjusted, PESO_SIGN)})`,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	if (Number(report.total_vat_adjusted) > 0) {
		reportTextFile.write({
			text: UNDERLINE_TEXT,
			alignment: ReportTextFile.ALIGNMENTS.RIGHT,
			rowNumber,
		});
		rowNumber += 1;
	}

	reportTextFile.write({
		text: 'VAT PAYABLE',
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	reportTextFile.write({
		text: `${formatInPeso(report.vat_payable, PESO_SIGN)} `,
		alignment: ReportTextFile.ALIGNMENTS.RIGHT,
		rowNumber,
	});
	rowNumber += 1;

	rowNumber += 1;

	reportTextFile.write({
		text: `GDT: ${
			report.generation_datetime
				? formatDateTime(report.generation_datetime)
				: EMPTY_CELL
		}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `PDT: ${
			report.printing_datetime
				? formatDateTime(report.printing_datetime)
				: EMPTY_CELL
		}`,
		alignment: ReportTextFile.ALIGNMENTS.LEFT,
		rowNumber,
	});
	rowNumber += 1;

	reportTextFile.write({
		text: `C: ${report?.generated_by?.employee_id || EMPTY_CELL}`,
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

	if (returnContent) {
		return reportTextFile.get();
	}

	reportTextFile.export(`ZReadReport_${report.id}.txt`);

	return null;
};
