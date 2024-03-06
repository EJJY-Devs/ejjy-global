import { BranchMachine, SiteSettings } from '../types';
import { ReportTextFile } from '../utils';
export declare const writeHeader: (reportTextFile: ReportTextFile, siteSettings: SiteSettings, branchMachine: BranchMachine, rowNumber: number, title?: string) => number;
export declare const writeFooter: (reportTextFile: ReportTextFile, siteSettings: SiteSettings, rowNumber: number) => number;
