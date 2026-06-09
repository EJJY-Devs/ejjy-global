import { SiteSettings, Transaction } from '../../../types';
export type PrintSalesInvoice = {
    transaction: Transaction;
    siteSettings: SiteSettings;
    isReprint?: boolean;
    isPdf?: boolean;
};
