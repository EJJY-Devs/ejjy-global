import { jsPDFOptions } from 'jspdf';
export type PaperSetting = Required<Pick<jsPDFOptions, 'format' | 'orientation'>>;
export declare const paperSizes: Record<string, PaperSetting>;
