import { SiteSettings, CashBreakdown, User } from '../../../types';

export type PrintCashCollection = {
	cashBreakdown: CashBreakdown;
	siteSettings: SiteSettings;
	user?: User;
	isPdf?: boolean;
};
