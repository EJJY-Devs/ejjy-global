import { BranchMachine, DailySales, SiteSettings, Transaction, User, XReadReport, ZReadReport } from '../types';
export declare const createSalesInvoiceTxt: (transaction: Transaction, siteSettings: SiteSettings, branchMachine: BranchMachine, isReprint?: boolean, returnContent?: boolean) => string | null;
export declare const createXReadTxt: (report: XReadReport, siteSettings: SiteSettings, branchMachine: BranchMachine, user: User, returnContent?: boolean) => string | null;
export declare const createDailySalesTxt: (dailySales: DailySales, siteSettings: SiteSettings, branchMachine: BranchMachine, user: User) => null;
export declare const createZReadTxt: (report: ZReadReport, siteSettings: SiteSettings, branchMachine: BranchMachine, user: User, returnContent?: boolean) => string | null;
