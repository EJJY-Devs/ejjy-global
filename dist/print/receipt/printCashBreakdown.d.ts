import { CashBreakdown, SiteSettings, User } from '../../types';
export declare const printCashBreakdown: (cashBreakdown: CashBreakdown, siteSettings: SiteSettings, user?: User, isPdf?: boolean) => string | undefined;
