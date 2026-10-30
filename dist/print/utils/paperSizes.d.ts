import { jsPDFOptions } from 'jspdf';
export type PaperSetting = Required<Pick<jsPDFOptions, 'format' | 'orientation'>>;
export declare const paperSizes: Record<string, PaperSetting>;
export declare const PDF_MARGIN_PX = 10;
export declare const getPdfPageContentHeight: ({ format, orientation, }: PaperSetting) => number;
