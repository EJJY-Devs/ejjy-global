import { SiteSettings, DailySales, User } from '../../../types';

export type PrintDailySales = {
	dailySales: DailySales;
	siteSettings: SiteSettings;
	user?: User;
	isPdf?: boolean;
	// Content height of the PDF page (see getPdfPageContentHeight); paginates
	// the PDF so no line or section is cut across pages.
	pdfPageHeight?: number;
};
