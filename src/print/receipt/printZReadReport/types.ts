import { SiteSettings, ZReadReport, User } from '../../../types';

export type PrintZReadReport = {
	report: ZReadReport;
	siteSettings: SiteSettings;
	user?: User;
	isPdf?: boolean;
	// Content height of the PDF page (see getPdfPageContentHeight); paginates
	// the PDF so no line or section is cut across pages.
	pdfPageHeight?: number;
};
