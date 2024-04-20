import { BirReport, BranchMachine, SiteSettings, User } from '../../../types';
export declare const NO_TRANSACTION_REMARK = "No transaction";
export declare const printBirReport: (birReports: BirReport[], siteSettings: SiteSettings, user: User, branchMachine?: BranchMachine) => string;
