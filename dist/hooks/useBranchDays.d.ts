import { AxiosResponse } from 'axios';
import { AxiosErrorResponse } from '../services/interfaces';
import { BranchDay } from '../types';
import { UseRetrieveQuery } from './inteface';
export declare const useBranchDayRetrieve: (data?: Partial<UseRetrieveQuery<BranchDay>>) => import("react-query").UseQueryResult<BranchDay, unknown>;
export declare const useBranchDayCreate: () => import("react-query").UseMutationResult<AxiosResponse<BranchDay>, AxiosErrorResponse<any>, {
    branchMachineId: number;
    startedById: number;
}, unknown>;
export declare const useBranchDayEdit: () => import("react-query").UseMutationResult<AxiosResponse<BranchDay>, AxiosErrorResponse<any>, {
    id: number;
    branchMachineId: number;
    endedById?: number | undefined;
    isAutomaticallyClosed?: boolean | undefined;
}, unknown>;
