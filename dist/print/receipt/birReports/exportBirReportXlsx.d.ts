import { BirReport, BranchMachine, SiteSettings, Transaction, User } from '../../../types';
export declare const exportBirReportXlsx: (birReports: BirReport[], siteSettings: SiteSettings, user: User, branchMachine?: BranchMachine) => Promise<Blob>;
export declare const exportBirReportPWDXlsx: (transactions: Transaction[], siteSettings: SiteSettings, user: User, branchMachine?: BranchMachine) => Promise<Blob>;
export declare const exportBirReportSCXlsx: (transactions: Transaction[], siteSettings: SiteSettings, user: User, branchMachine?: BranchMachine) => Promise<Blob>;
export declare const exportBirReportNAACXlsx: (transactions: Transaction[], siteSettings: SiteSettings, user: User, branchMachine?: BranchMachine) => Promise<Blob>;
export declare const exportBirReportSPXlsx: (transactions: Transaction[], siteSettings: SiteSettings, user: User, branchMachine?: BranchMachine) => Promise<Blob>;
