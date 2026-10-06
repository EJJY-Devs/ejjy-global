import dayjs, { Dayjs } from 'dayjs';
import type { Alignment, Borders, Fill, Worksheet } from 'exceljs';
import { BirHeaderDetails } from './birReportHelper';

export const XLSX_MIME_TYPE =
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const AMOUNT_NUMBER_FORMAT = '#,##0.00';
const INTEGER_NUMBER_FORMAT = '0';
// Same layout as DATE_FORMAT_UI, expressed as an Excel number format.
const DATE_NUMBER_FORMAT = 'mm/dd/yyyy';
const DATE_TIME_NUMBER_FORMAT = 'mm/dd/yyyy hh:mm AM/PM';

const HEADER_GROUP_FILL = 'FFADB9CA';
const HEADER_FILL = 'FFBDD6EE';
// The label columns of the header block (first and fourth) need room for
// "POS Terminal No.:" / "Date Generated:".
const MIN_LABEL_COLUMN_WIDTH = 18;

export type BirXlsxCellValue = string | number | Date | null | undefined;

export type BirXlsxColumn<Row> = {
	type: 'text' | 'date' | 'integer' | 'amount';
	// Adds a SUBTOTAL formula to the totals row.
	total?: boolean;
	value: (row: Row) => BirXlsxCellValue;
	width: number;
};

// Same idea as <th colSpan rowSpan> in the PDF tables, so multi-level headers
// can be described the same way.
export type BirXlsxHeaderCell = {
	colSpan?: number;
	label: string;
	rowSpan?: number;
};

type BuildBirReportXlsxOptions<Row> = {
	columns: BirXlsxColumn<Row>[];
	// Date of a row, used for the "Period From/To" header lines.
	getRowDate: (row: Row) => string;
	headerDetails: BirHeaderDetails;
	headerRows: BirXlsxHeaderCell[][];
	rows: Row[];
	sheetName: string;
	title: string;
};

// Excel has no time zones: a date is stored as the wall-clock digits we want
// to see, so build it from the Manila calendar day (the one the PDF prints)
// and write it as UTC midnight.
export const toExcelDate = (datetime: string | Dayjs): Date | null => {
	const date = dayjs.tz(datetime);

	return date.isValid()
		? new Date(Date.UTC(date.year(), date.month(), date.date()))
		: null;
};

const toExcelDateTime = (date: Dayjs) =>
	new Date(
		Date.UTC(
			date.year(),
			date.month(),
			date.date(),
			date.hour(),
			date.minute(),
			date.second(),
		),
	);

// Identifiers such as OR numbers and IDs stay text on purpose (leading zeros).
// This is for fields that are numbers/dates but arrive as free-form strings.
export const toExcelIntegerOrText = (value?: string): string | number => {
	const trimmed = (value ?? '').toString().trim();
	return /^\d+$/.test(trimmed) ? Number(trimmed) : trimmed;
};

const BIRTHDATE_FORMATS = [
	'YYYY-MM-DD',
	'MM/DD/YYYY',
	'M/D/YYYY',
	'YYYY/MM/DD',
	'MMMM D, YYYY',
];

export const toExcelDateOrText = (value?: string): Date | string => {
	const trimmed = (value ?? '').toString().trim();
	const date = dayjs(trimmed, BIRTHDATE_FORMATS, true);

	return trimmed && date.isValid()
		? new Date(Date.UTC(date.year(), date.month(), date.date()))
		: trimmed;
};

const thinBorder = { style: 'thin' as const, color: { argb: 'FF000000' } };
const cellBorders: Partial<Borders> = {
	top: thinBorder,
	left: thinBorder,
	bottom: thinBorder,
	right: thinBorder,
};

const solidFill = (argb: string): Fill => ({
	type: 'pattern',
	pattern: 'solid',
	fgColor: { argb },
});

const numberFormats: Record<
	BirXlsxColumn<unknown>['type'],
	string | undefined
> = {
	text: undefined,
	date: DATE_NUMBER_FORMAT,
	integer: INTEGER_NUMBER_FORMAT,
	amount: AMOUNT_NUMBER_FORMAT,
};

const alignments: Record<BirXlsxColumn<unknown>['type'], Partial<Alignment>> = {
	text: { horizontal: 'left', vertical: 'middle' },
	date: { horizontal: 'center', vertical: 'middle' },
	integer: { horizontal: 'right', vertical: 'middle' },
	amount: { horizontal: 'right', vertical: 'middle' },
};

const getPeriod = (dates: Date[]) => {
	if (dates.length === 0) {
		return { from: null, to: null };
	}

	const times = dates.map((date) => date.getTime());
	return {
		from: new Date(Math.min(...times)),
		to: new Date(Math.max(...times)),
	};
};

// Header block: title, then proprietor/address/TIN across the sheet, then
// label/value pairs two to a row to keep the (frozen) block short.
// Returns the next free row.
const addHeaderBlock = (
	sheet: Worksheet,
	{
		columnCount,
		details,
		period,
		title,
	}: {
		columnCount: number;
		details: BirHeaderDetails;
		period: { from: Date | null; to: Date | null };
		title: string;
	},
) => {
	const labelFont = { bold: true };
	const leftAligned: Partial<Alignment> = {
		horizontal: 'left',
		vertical: 'middle',
	};

	const setLabel = (row: number, column: number, label: string) => {
		const cell = sheet.getCell(row, column);
		cell.value = label;
		cell.font = labelFont;
		cell.alignment = leftAligned;
	};

	const setValue = (
		row: number,
		fromColumn: number,
		toColumn: number,
		value: string | Date | null | undefined,
		numFmt?: string,
	) => {
		const cell = sheet.getCell(row, fromColumn);
		cell.value = value ?? null;
		cell.alignment = leftAligned;
		if (numFmt) {
			cell.numFmt = numFmt;
		}
		sheet.mergeCells(row, fromColumn, row, toColumn);
	};

	const titleCell = sheet.getCell(1, 1);
	titleCell.value = title;
	titleCell.font = { bold: true, size: 14 };
	titleCell.alignment = leftAligned;
	sheet.mergeCells(1, 1, 1, columnCount);

	// Full-width lines
	[
		['Proprietor:', details.proprietor],
		['Address:', details.address],
		['TIN:', details.tin],
	].forEach(([label, value], index) => {
		setLabel(2 + index, 1, label as string);
		setValue(2 + index, 2, columnCount, value);
	});

	// Pairs: [left label, left value, right label, right value]
	const pairs: [
		string,
		string | Date | null | undefined,
		string,
		string | Date | null | undefined,
		string?,
		string?,
	][] = [
		['Software:', details.software, 'SN:', details.serialNumber],
		['MIN:', details.minNumber, 'POS Terminal No.:', ''],
		[
			'Date Generated:',
			toExcelDateTime(details.dateGenerated),
			'UserID:',
			details.userId,
			DATE_TIME_NUMBER_FORMAT,
		],
		[
			'Period From:',
			period.from,
			'Period To:',
			period.to,
			DATE_NUMBER_FORMAT,
			DATE_NUMBER_FORMAT,
		],
	];

	pairs.forEach(
		(
			[leftLabel, leftValue, rightLabel, rightValue, leftFormat, rightFormat],
			index,
		) => {
			const row = 5 + index;
			setLabel(row, 1, leftLabel);
			setValue(row, 2, 3, leftValue, leftFormat);
			setLabel(row, 4, rightLabel);
			setValue(row, 5, 6, rightValue, rightFormat);
		},
	);

	// One blank spacer row before the table header.
	return 5 + pairs.length + 1;
};

// Lays the header cells out like an HTML table (rowSpan/colSpan) and returns
// the row index of the last header row (the one the filter sits on).
const addTableHeader = (
	sheet: Worksheet,
	headerRows: BirXlsxHeaderCell[][],
	firstRow: number,
	columnCount: number,
) => {
	const occupied: boolean[][] = headerRows.map(() => []);
	let widestRow = 0;

	headerRows.forEach((cells, rowOffset) => {
		let column = 0;

		cells.forEach((headerCell) => {
			while (occupied[rowOffset][column]) {
				column += 1;
			}

			const colSpan = headerCell.colSpan ?? 1;
			const rowSpan = headerCell.rowSpan ?? 1;

			for (let r = 0; r < rowSpan; r += 1) {
				for (let c = 0; c < colSpan; c += 1) {
					occupied[rowOffset + r][column + c] = true;
				}
			}

			const top = firstRow + rowOffset;
			const left = column + 1;
			const cell = sheet.getCell(top, left);
			cell.value = headerCell.label;
			cell.font = { bold: true };
			cell.fill = solidFill(colSpan > 1 ? HEADER_GROUP_FILL : HEADER_FILL);
			cell.border = cellBorders;
			cell.alignment = {
				horizontal: 'center',
				vertical: 'middle',
				wrapText: true,
			};

			if (colSpan > 1 || rowSpan > 1) {
				sheet.mergeCells(top, left, top + rowSpan - 1, left + colSpan - 1);
			}

			column += colSpan;
			widestRow = Math.max(widestRow, column);
		});

		sheet.getRow(firstRow + rowOffset).height = headerRows.length > 1 ? 22 : 34;
	});

	if (widestRow !== columnCount) {
		throw new Error(
			`BIR report header has ${widestRow} columns but ${columnCount} column definitions`,
		);
	}

	return firstRow + headerRows.length - 1;
};

export const buildBirReportXlsx = async <Row>({
	columns,
	getRowDate,
	headerDetails,
	headerRows,
	rows,
	sheetName,
	title,
}: BuildBirReportXlsxOptions<Row>): Promise<Blob> => {
	// Loaded on demand so consumers that only use PDFs don't evaluate ExcelJS.
	const { Workbook } = await import('exceljs');

	const workbook = new Workbook();
	workbook.creator = headerDetails.software.trim() || 'ejjy';
	workbook.created = new Date();
	// Recalculate the totals formulas when opened (zero cached results are dropped).
	workbook.calcProperties.fullCalcOnLoad = true;

	const sheet = workbook.addWorksheet(sheetName, {
		pageSetup: {
			orientation: 'landscape',
			paperSize: 9, // A4
			fitToPage: true,
			fitToWidth: 1,
			fitToHeight: 0,
		},
	});

	const columnCount = columns.length;

	columns.forEach((column, index) => {
		const isLabelColumn = index === 0 || index === 3;
		sheet.getColumn(index + 1).width = isLabelColumn
			? Math.max(column.width, MIN_LABEL_COLUMN_WIDTH)
			: column.width;
	});

	const period = getPeriod(
		rows
			.map((row) => toExcelDate(getRowDate(row)))
			.filter((date): date is Date => date !== null),
	);

	const headerFirstRow = addHeaderBlock(sheet, {
		columnCount,
		details: headerDetails,
		period,
		title,
	});
	const leafHeaderRow = addTableHeader(
		sheet,
		headerRows,
		headerFirstRow,
		columnCount,
	);

	// Data rows
	const firstDataRow = leafHeaderRow + 1;
	const sums = columns.map(() => 0);

	rows.forEach((row, rowIndex) => {
		columns.forEach((column, columnIndex) => {
			const value = column.value(row);
			const cell = sheet.getCell(firstDataRow + rowIndex, columnIndex + 1);

			cell.value = value === undefined || value === '' ? null : value;
			cell.border = cellBorders;
			cell.alignment = alignments[column.type];

			const numFmt = numberFormats[column.type];
			if (numFmt) {
				cell.numFmt = numFmt;
			}

			if (column.total && typeof value === 'number') {
				sums[columnIndex] += value;
			}
		});
	});

	const lastDataRow = firstDataRow + rows.length - 1;

	// Totals use SUBTOTAL(109) so they follow the autofilter; the cached result
	// covers viewers that do not recalculate.
	if (rows.length > 0) {
		const totalsRow = lastDataRow + 1;
		const totalsLabel = sheet.getCell(totalsRow, 1);
		totalsLabel.value = 'TOTAL';

		columns.forEach((column, columnIndex) => {
			const cell = sheet.getCell(totalsRow, columnIndex + 1);

			if (column.total) {
				const { letter } = sheet.getColumn(columnIndex + 1);
				cell.value = {
					formula: `SUBTOTAL(109,${letter}${firstDataRow}:${letter}${lastDataRow})`,
					result: sums[columnIndex],
				};
				cell.numFmt = numberFormats[column.type] as string;
				cell.alignment = alignments[column.type];
			}

			cell.font = { bold: true };
			cell.fill = solidFill(HEADER_FILL);
			cell.border = cellBorders;
		});
	}

	sheet.views = [{ state: 'frozen', xSplit: 0, ySplit: leafHeaderRow }];
	sheet.autoFilter = {
		from: { row: leafHeaderRow, column: 1 },
		to: { row: Math.max(lastDataRow, leafHeaderRow), column: columnCount },
	};
	sheet.pageSetup.printTitlesRow = `${headerFirstRow}:${leafHeaderRow}`;

	const buffer = await workbook.xlsx.writeBuffer();

	return new Blob([buffer], { type: XLSX_MIME_TYPE });
};
