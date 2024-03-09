import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/BranchMachinesService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { BranchMachine } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useBranchMachines: (data?: UseListQuery<BranchMachine, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<BranchMachine>, Error>;
export declare const useBranchMachineRetrieve: (data: UseRetrieveQuery<BranchMachine>) => import("react-query").UseQueryResult<BranchMachine, unknown>;
export declare const useBranchMachinePing: () => import("react-query").UseMutationResult<AxiosResponse<boolean>, AxiosErrorResponse<any>, number, unknown>;
export default useBranchMachines;
