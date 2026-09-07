import { SiteSettings, CashBreakdown, User } from '../../../types';

export type PrintCashIn = {
	cashBreakdown: CashBreakdown;
	siteSettings: SiteSettings;
	user?: User;
	isPdf?: boolean;
};
