import { BirReport, BranchMachine, SiteSettings, User } from '../../../types';
import { NO_TRANSACTION_REMARK } from './birReportHelper';
export { NO_TRANSACTION_REMARK };
export declare const printBirReport: (birReports: BirReport[], siteSettings: SiteSettings, user: User, branchMachine?: BranchMachine) => string;
