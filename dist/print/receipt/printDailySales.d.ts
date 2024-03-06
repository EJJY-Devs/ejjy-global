import { BranchMachine, DailySales, GeneratedByUser, SiteSettings } from '../../types';
export declare const printDailySales: (dailySales: DailySales, siteSettings: SiteSettings, branchMachine: BranchMachine, user: GeneratedByUser, isPdf?: boolean) => string | undefined;
