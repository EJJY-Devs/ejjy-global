import { BirReport, BranchMachine, CashBreakdown, CollectionReceipt, DailySales, SiteSettings, Transaction, User, XReadReport, ZReadReport } from '../types';
declare const configurePrinter: (appPrinterName: string, appprinterFontSize: string, appprinterFontFamily: string) => void;
export declare const openCashDrawer: () => Promise<void>;
export declare const printCollectionReceipt: (collectionReceipt: CollectionReceipt, siteSettings: SiteSettings, branchMachine: BranchMachine) => void;
export declare const printSalesInvoice: (transaction: Transaction, siteSettings: SiteSettings, branchMachine: BranchMachine, isReprint?: boolean, isPdf?: boolean) => string | undefined;
export declare const printDailySales: (dailySales: DailySales, siteSettings: SiteSettings, branchMachine: BranchMachine, user: User, isPdf?: boolean) => string | undefined;
export declare const printXReadReport: (report: XReadReport, siteSettings: SiteSettings, branchMachine: BranchMachine, user: User, isPdf?: boolean) => string | undefined;
export declare const printZReadReport: (report: ZReadReport, siteSettings: SiteSettings, branchMachine: BranchMachine, user: User, isPdf?: boolean) => string | undefined;
export declare const printCashBreakdown: (cashBreakdown: CashBreakdown, siteSettings: SiteSettings, branchMachine: BranchMachine) => void;
export declare const printBirReport: (birReports: BirReport[], siteSettings: SiteSettings, branchMachine: BranchMachine, user: User) => string;
export declare const printCashOut: (cashOut: CashBreakdown, siteSettings: SiteSettings, branchMachine: BranchMachine) => void;
export default configurePrinter;
