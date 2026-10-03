import { SiteSettings, CashBreakdown, User } from '../../../types';
export type CashInDrawerSummary = {
    ePayments: number;
    others: number;
};
export type PrintCashBreakdown = {
    cashBreakdown: CashBreakdown;
    siteSettings: SiteSettings;
    user?: User;
    isPdf?: boolean;
    cashInDrawerSummary?: CashInDrawerSummary;
};
