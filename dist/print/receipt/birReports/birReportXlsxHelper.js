"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBirReportXlsx = exports.toExcelDateOrText = exports.toExcelIntegerOrText = exports.toExcelDate = exports.AMOUNT_NUMBER_FORMAT = exports.XLSX_MIME_TYPE = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
exports.XLSX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
exports.AMOUNT_NUMBER_FORMAT = '#,##0.00';
const INTEGER_NUMBER_FORMAT = '0';
// Same layout as DATE_FORMAT_UI, expressed as an Excel number format.
const DATE_NUMBER_FORMAT = 'mm/dd/yyyy';
const DATE_TIME_NUMBER_FORMAT = 'mm/dd/yyyy hh:mm AM/PM';
const HEADER_GROUP_FILL = 'FFADB9CA';
const HEADER_FILL = 'FFBDD6EE';
// The label columns of the header block (first and fourth) need room for
// "POS Terminal No.:" / "Date Generated:".
const MIN_LABEL_COLUMN_WIDTH = 18;
// Excel has no time zones: a date is stored as the wall-clock digits we want
// to see, so build it from the Manila calendar day (the one the PDF prints)
// and write it as UTC midnight.
const toExcelDate = (datetime) => {
    const date = dayjs_1.default.tz(datetime);
    return date.isValid()
        ? new Date(Date.UTC(date.year(), date.month(), date.date()))
        : null;
};
exports.toExcelDate = toExcelDate;
const toExcelDateTime = (date) => new Date(Date.UTC(date.year(), date.month(), date.date(), date.hour(), date.minute(), date.second()));
// Identifiers such as OR numbers and IDs stay text on purpose (leading zeros).
// This is for fields that are numbers/dates but arrive as free-form strings.
const toExcelIntegerOrText = (value) => {
    const trimmed = (value !== null && value !== void 0 ? value : '').toString().trim();
    return /^\d+$/.test(trimmed) ? Number(trimmed) : trimmed;
};
exports.toExcelIntegerOrText = toExcelIntegerOrText;
const BIRTHDATE_FORMATS = [
    'YYYY-MM-DD',
    'MM/DD/YYYY',
    'M/D/YYYY',
    'YYYY/MM/DD',
    'MMMM D, YYYY',
];
const toExcelDateOrText = (value) => {
    const trimmed = (value !== null && value !== void 0 ? value : '').toString().trim();
    const date = (0, dayjs_1.default)(trimmed, BIRTHDATE_FORMATS, true);
    return trimmed && date.isValid()
        ? new Date(Date.UTC(date.year(), date.month(), date.date()))
        : trimmed;
};
exports.toExcelDateOrText = toExcelDateOrText;
const thinBorder = { style: 'thin', color: { argb: 'FF000000' } };
const cellBorders = {
    top: thinBorder,
    left: thinBorder,
    bottom: thinBorder,
    right: thinBorder,
};
const solidFill = (argb) => ({
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb },
});
const numberFormats = {
    text: undefined,
    date: DATE_NUMBER_FORMAT,
    integer: INTEGER_NUMBER_FORMAT,
    amount: exports.AMOUNT_NUMBER_FORMAT,
};
const alignments = {
    text: { horizontal: 'left', vertical: 'middle' },
    date: { horizontal: 'center', vertical: 'middle' },
    integer: { horizontal: 'right', vertical: 'middle' },
    amount: { horizontal: 'right', vertical: 'middle' },
};
const getPeriod = (dates) => {
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
const addHeaderBlock = (sheet, { columnCount, details, period, title, }) => {
    const labelFont = { bold: true };
    const leftAligned = {
        horizontal: 'left',
        vertical: 'middle',
    };
    const setLabel = (row, column, label) => {
        const cell = sheet.getCell(row, column);
        cell.value = label;
        cell.font = labelFont;
        cell.alignment = leftAligned;
    };
    const setValue = (row, fromColumn, toColumn, value, numFmt) => {
        const cell = sheet.getCell(row, fromColumn);
        cell.value = value !== null && value !== void 0 ? value : null;
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
        setLabel(2 + index, 1, label);
        setValue(2 + index, 2, columnCount, value);
    });
    // Pairs: [left label, left value, right label, right value]
    const pairs = [
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
    pairs.forEach(([leftLabel, leftValue, rightLabel, rightValue, leftFormat, rightFormat], index) => {
        const row = 5 + index;
        setLabel(row, 1, leftLabel);
        setValue(row, 2, 3, leftValue, leftFormat);
        setLabel(row, 4, rightLabel);
        setValue(row, 5, 6, rightValue, rightFormat);
    });
    // One blank spacer row before the table header.
    return 5 + pairs.length + 1;
};
// Lays the header cells out like an HTML table (rowSpan/colSpan) and returns
// the row index of the last header row (the one the filter sits on).
const addTableHeader = (sheet, headerRows, firstRow, columnCount) => {
    const occupied = headerRows.map(() => []);
    let widestRow = 0;
    headerRows.forEach((cells, rowOffset) => {
        let column = 0;
        cells.forEach((headerCell) => {
            var _a, _b;
            while (occupied[rowOffset][column]) {
                column += 1;
            }
            const colSpan = (_a = headerCell.colSpan) !== null && _a !== void 0 ? _a : 1;
            const rowSpan = (_b = headerCell.rowSpan) !== null && _b !== void 0 ? _b : 1;
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
        throw new Error(`BIR report header has ${widestRow} columns but ${columnCount} column definitions`);
    }
    return firstRow + headerRows.length - 1;
};
const buildBirReportXlsx = ({ columns, getRowDate, headerDetails, headerRows, rows, sheetName, title, }) => __awaiter(void 0, void 0, void 0, function* () {
    // Loaded on demand so consumers that only use PDFs don't evaluate ExcelJS.
    const { Workbook } = yield Promise.resolve().then(() => __importStar(require('exceljs')));
    const workbook = new Workbook();
    workbook.creator = headerDetails.software.trim() || 'ejjy';
    workbook.created = new Date();
    // Recalculate the totals formulas when opened (zero cached results are dropped).
    workbook.calcProperties.fullCalcOnLoad = true;
    const sheet = workbook.addWorksheet(sheetName, {
        pageSetup: {
            orientation: 'landscape',
            paperSize: 9,
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
    const period = getPeriod(rows
        .map((row) => (0, exports.toExcelDate)(getRowDate(row)))
        .filter((date) => date !== null));
    const headerFirstRow = addHeaderBlock(sheet, {
        columnCount,
        details: headerDetails,
        period,
        title,
    });
    const leafHeaderRow = addTableHeader(sheet, headerRows, headerFirstRow, columnCount);
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
                cell.numFmt = numberFormats[column.type];
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
    const buffer = yield workbook.xlsx.writeBuffer();
    return new Blob([buffer], { type: exports.XLSX_MIME_TYPE });
});
exports.buildBirReportXlsx = buildBirReportXlsx;
