import { BranchMachine, SiteSettings, Transaction, User } from '../../../types';
export declare const printBirReportSP: (transactions: Transaction[], siteSettings: SiteSettings, user: User, branchMachine?: BranchMachine) => string;
