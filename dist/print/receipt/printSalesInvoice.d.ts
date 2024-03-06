import { BranchMachine, SiteSettings, Transaction } from '../../types';
export declare const printSalesInvoice: (transaction: Transaction, siteSettings: SiteSettings, branchMachine: BranchMachine, isReprint?: boolean, isPdf?: boolean) => string | undefined;
