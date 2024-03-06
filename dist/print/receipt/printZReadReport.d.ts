import { BranchMachine, GeneratedByUser, SiteSettings, ZReadReport } from '../../types';
export declare const printZReadReport: (report: ZReadReport, siteSettings: SiteSettings, branchMachine: BranchMachine, user: GeneratedByUser, isPdf?: boolean) => string | undefined;
