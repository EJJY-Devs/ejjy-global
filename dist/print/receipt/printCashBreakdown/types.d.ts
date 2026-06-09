import { SiteSettings, CashBreakdown, User } from '../../../types';
export type PrintCashBreakdown = {
    cashBreakdown: CashBreakdown;
    siteSettings: SiteSettings;
    user?: User;
    isPdf?: boolean;
};
