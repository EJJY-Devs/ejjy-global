import { AxiosErrorResponse } from '../services/interfaces';
import { BranchMachine, SiteSettings, User } from '../types';
import { AxiosResponse } from 'axios';
export type BulkExportOnProgress = (percent: number) => void;
interface BulkExport {
    branchMachine: BranchMachine;
    siteSettings: SiteSettings;
    timeRange?: string;
    user: User;
    onProgress?: BulkExportOnProgress;
    since?: string;
    until?: string;
    groupByBranchMachine?: boolean;
    readBaseURL?: string;
    writeBaseURL?: string;
}
export declare const useBulkExport: () => import("react-query").UseMutationResult<AxiosResponse<string>[], AxiosErrorResponse<any>, BulkExport, unknown>;
type GenerateReports = {
    enabled: boolean;
    intervalMs: number;
    branchId?: number;
    branchMachineId?: number;
    userId?: number;
    baseURL?: string;
};
export declare const useGenerateReports: ({ branchId, branchMachineId, userId, enabled, intervalMs, baseURL, }: GenerateReports) => import("react-query").UseQueryResult<any, unknown>;
export {};
