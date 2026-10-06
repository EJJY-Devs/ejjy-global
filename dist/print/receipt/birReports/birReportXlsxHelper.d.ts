import { Dayjs } from 'dayjs';
import { BirHeaderDetails } from './birReportHelper';
export declare const XLSX_MIME_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
export declare const AMOUNT_NUMBER_FORMAT = "#,##0.00";
export type BirXlsxCellValue = string | number | Date | null | undefined;
export type BirXlsxColumn<Row> = {
    type: 'text' | 'date' | 'integer' | 'amount';
    total?: boolean;
    value: (row: Row) => BirXlsxCellValue;
    width: number;
};
export type BirXlsxHeaderCell = {
    colSpan?: number;
    label: string;
    rowSpan?: number;
};
type BuildBirReportXlsxOptions<Row> = {
    columns: BirXlsxColumn<Row>[];
    getRowDate: (row: Row) => string;
    headerDetails: BirHeaderDetails;
    headerRows: BirXlsxHeaderCell[][];
    rows: Row[];
    sheetName: string;
    title: string;
};
export declare const toExcelDate: (datetime: string | Dayjs) => Date | null;
export declare const toExcelIntegerOrText: (value?: string) => string | number;
export declare const toExcelDateOrText: (value?: string) => Date | string;
export declare const buildBirReportXlsx: <Row>({ columns, getRowDate, headerDetails, headerRows, rows, sheetName, title, }: BuildBirReportXlsxOptions<Row>) => Promise<Blob>;
export {};
