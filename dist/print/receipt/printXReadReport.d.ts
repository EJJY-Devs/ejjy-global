import { BranchMachine, GeneratedByUser, SiteSettings, XReadReport } from '../../types';
export declare const printXReadReport: (report: XReadReport, siteSettings: SiteSettings, branchMachine: BranchMachine, user: GeneratedByUser, isPdf?: boolean) => string | undefined;
