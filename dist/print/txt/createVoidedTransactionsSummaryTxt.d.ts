import { SiteSettings, Transaction, User } from '../../types';
export declare const createVoidedTransactionsSummaryTxt: (transactions: Transaction[], siteSettings: SiteSettings, user: User, timeRange: string, returnContent?: boolean) => string | null;
