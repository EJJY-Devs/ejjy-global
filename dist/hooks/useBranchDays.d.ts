import { AxiosResponse } from 'axios';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { BranchDay } from '../types';
import { UseListQuery } from './inteface';
export declare const useBranchDayRetrieve: (data?: UseListQuery<BranchDay>) => import("react-query").UseQueryResult<QueryResponse<BranchDay>, Error>;
export declare const useBranchDayCreate: () => import("react-query").UseMutationResult<AxiosResponse<BranchDay>, AxiosErrorResponse<any>, {
    branchMachineId: number;
    startedById: number;
}, unknown>;
export declare const useBranchDayEdit: () => import("react-query").UseMutationResult<AxiosResponse<BranchDay>, AxiosErrorResponse<any>, {
    branchMachineId: number;
    endedById: number;
    isAutomaticallyClosed?: boolean | undefined;
}, unknown>;
