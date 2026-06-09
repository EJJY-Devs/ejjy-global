import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/ZReadReportsService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { ZReadReport } from '../types';
import { UseListQuery } from './inteface';
declare const useZReadReports: (data?: UseListQuery<ZReadReport, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<ZReadReport>, Error>;
export declare const useZReadReportCreate: () => import("react-query").UseMutationResult<AxiosResponse<ZReadReport>, AxiosErrorResponse<any>, {
    branchMachineId: number;
    date: string;
    userId: number;
}, unknown>;
export default useZReadReports;
