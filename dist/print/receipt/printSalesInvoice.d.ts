import { SiteSettings, Transaction } from '../../types';
export declare const printSalesInvoice: (transaction: Transaction, siteSettings: SiteSettings, isReprint?: boolean, isPdf?: boolean) => string | undefined;
