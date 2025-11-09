import { SiteSettings, CashBreakdown } from '../../../types';

export type PrintCashOut = {
	cashOut: CashBreakdown;
	siteSettings: SiteSettings;
	isPdf?: boolean;
};
