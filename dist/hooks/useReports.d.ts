import { AxiosErrorResponse } from '../services/interfaces';
import { BranchMachine, SiteSettings, User } from '../types';
import { AxiosResponse } from 'axios';
interface BulkExport {
    branchMachine: BranchMachine;
    siteSettings: SiteSettings;
    timeRange: string;
    user: User;
}
export declare const useBulkExport: () => import("react-query").UseMutationResult<AxiosResponse<string>[], AxiosErrorResponse<any>, BulkExport, unknown>;
interface GenerateReports {
    enabled: boolean;
    intervalMs: number;
    branchId: number;
}
export declare const useGenerateReports: ({ branchId, enabled, intervalMs, }: GenerateReports) => import("react-query").UseQueryResult<any, unknown>;
export {};
