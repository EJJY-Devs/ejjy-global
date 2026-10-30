import { OrderOfPayment } from '../../../types';

export type PrintOrderOfPayment = {
	orderOfPayment: OrderOfPayment;
	isPdf?: boolean;
	// Content height of the PDF page (see getPdfPageContentHeight); paginates
	// the PDF so no line or section is cut across pages.
	pdfPageHeight?: number;
};
