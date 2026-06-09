import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/XReadReportsService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { XReadReport } from '../types';
import { UseListQuery } from './inteface';
declare const useXReadReports: (data?: UseListQuery<XReadReport, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<XReadReport>, Error>;
export declare const useXReadReportCreate: () => import("react-query").UseMutationResult<AxiosResponse<XReadReport>, AxiosErrorResponse<any>, {
    branchMachineId: number;
    date: string;
    userId: number;
}, unknown>;
export default useXReadReports;
