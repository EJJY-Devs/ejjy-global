import { AxiosResponse } from 'axios';
import { UseMutationOptions } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { Modify, Params } from '../services/BranchMachinesService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { BranchMachine } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useBranchMachines: (data?: UseListQuery<BranchMachine, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<BranchMachine>, Error>;
export declare const useBranchMachineRetrieve: (data: UseRetrieveQuery<BranchMachine>) => import("react-query").UseQueryResult<BranchMachine, unknown>;
export declare const useBranchMachinePing: () => import("react-query").UseMutationResult<AxiosResponse<boolean>, AxiosErrorResponse<any>, {
    onlineBranchMachineId: number;
    onlineApiUrlOverride?: string | undefined;
}, unknown>;
export declare const useBranchMachineCreate: (options?: UseMutationOptions<AxiosResponse<BranchMachine>, AxiosErrorResponse, CamelCasedProperties<Modify>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<BranchMachine>, AxiosErrorResponse<any>, {
    branchId: string;
    machineIdentificationNumber: string;
    name: string;
    permitToUse: string;
    serverUrl: string;
    type: string;
    storageSerialNumber: string;
    ptuDateIssued: string;
}, unknown>;
export declare const useBranchMachineEdit: (options?: UseMutationOptions<AxiosResponse<BranchMachine>, AxiosErrorResponse, CamelCasedProperties<Modify & {
    id: number;
}>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<BranchMachine>, AxiosErrorResponse<any>, {
    branchId: string;
    machineIdentificationNumber: string;
    name: string;
    permitToUse: string;
    serverUrl: string;
    type: string;
    storageSerialNumber: string;
    ptuDateIssued: string;
    id: number;
}, unknown>;
export declare const useBranchMachineDelete: (options?: UseMutationOptions<AxiosResponse<void>, AxiosErrorResponse, number>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<void>, AxiosErrorResponse<any>, number, unknown>;
export default useBranchMachines;
