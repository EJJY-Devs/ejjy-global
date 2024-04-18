import { DailySales, SiteSettings, User } from '../../types';
export declare const printDailySales: (dailySales: DailySales, siteSettings: SiteSettings, user?: User, isPdf?: boolean) => string | undefined;
