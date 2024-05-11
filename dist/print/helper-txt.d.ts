import { BranchMachine, SiteSettings, User } from '../types';
import { ReportTextFile } from '../utils';
export declare const TXT_LINE_BREAK = "";
export declare const TXT_NBSP = " ";
export declare const TXT_DIVIDER = "----------------------------------------------------------------------";
export type RowData = {
    left?: string | number;
    center?: string | number;
    right?: string | number;
};
type Props = {
    title?: string;
    branchMachine: BranchMachine;
    siteSettings: SiteSettings;
};
export declare const getTxtHeader: ({ title, branchMachine, siteSettings, }: Props) => RowData[];
export declare const getTxtPrintDetails: (user: User) => RowData;
export declare const getTxtFooter: (siteSettings: SiteSettings) => RowData[];
export declare const getTxtItemBlock: (items: {
    label: string;
    value: string | number;
}[]) => RowData[];
export declare const writeFile: (rowData: (string | RowData)[], reportTextFile: ReportTextFile) => void;
export {};
