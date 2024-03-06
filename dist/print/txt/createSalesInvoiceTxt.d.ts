import { BranchMachine, SiteSettings, Transaction } from '../../types';
export declare const createSalesInvoiceTxt: (transaction: Transaction, siteSettings: SiteSettings, branchMachine: BranchMachine, isReprint?: boolean, returnContent?: boolean) => string | null;
