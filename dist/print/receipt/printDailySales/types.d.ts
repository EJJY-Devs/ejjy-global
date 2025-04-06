import { SiteSettings, DailySales, User } from '../../../types';
export type PrintDailySales = {
    dailySales: DailySales;
    siteSettings: SiteSettings;
    user?: User;
    isPdf?: boolean;
};
