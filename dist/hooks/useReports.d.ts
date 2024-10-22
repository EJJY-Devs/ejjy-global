import { AxiosErrorResponse } from '../services/interfaces';
import { BranchMachine, SiteSettings, User } from '../types';
import { AxiosResponse } from 'axios';
interface BulkExport {
    branchMachine: BranchMachine;
    siteSettings: SiteSettings;
    timeRange?: string;
    user: User;
}
export declare const useBulkExport: () => import("react-query").UseMutationResult<AxiosResponse<string>[], AxiosErrorResponse<any>, BulkExport, unknown>;
type GenerateReports = {
    enabled: boolean;
    intervalMs: number;
    branchId?: number;
    branchMachineId?: number;
    userId?: number;
};
export declare const useGenerateReports: ({ branchId, branchMachineId, userId, enabled, intervalMs, }: GenerateReports) => import("react-query").UseQueryResult<any, unknown>;
export {};
