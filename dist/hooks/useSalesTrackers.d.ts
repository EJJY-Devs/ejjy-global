import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/SalesTrackerService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { SalesTracker } from '../types';
import { UseListQuery } from './inteface';
declare const useSalesTrackers: (data?: UseListQuery<SalesTracker, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<SalesTracker>, Error>;
export declare const useSalesTrackerReset: () => import("react-query").UseMutationResult<AxiosResponse<SalesTracker>, AxiosErrorResponse<any>, {
    branchMachineId: number;
}, unknown>;
export default useSalesTrackers;
