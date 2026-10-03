import { SiteSettings, CashBreakdown, User } from '../../../types';

export type CashInDrawerSummary = {
	ePayments: number;
	// All session payments minus (cash on hand + e-payments)
	others: number;
};

export type PrintCashBreakdown = {
	cashBreakdown: CashBreakdown;
	siteSettings: SiteSettings;
	user?: User;
	isPdf?: boolean;
	// Optional extra lines for Cash in Drawer: e-payments, others, remittance
	cashInDrawerSummary?: CashInDrawerSummary;
};
