import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { ZReadReport } from '../types';
import { UseListQuery, UseListQueryParams } from './inteface';
import { AxiosResponse } from 'axios';
interface ListQueryParams extends UseListQueryParams {
    branchMachineId?: number;
    branchMachineName?: string;
}
declare const useZReadReports: (data?: UseListQuery<ZReadReport, ListQueryParams>) => import("react-query").UseQueryResult<QueryResponse<ZReadReport>, Error>;
interface CreateBody {
    branchMachineId: number;
    date: string;
    userId: number;
}
export declare const useZReadReportCreate: () => import("react-query").UseMutationResult<AxiosResponse<ZReadReport>, AxiosErrorResponse<any>, CreateBody, unknown>;
export default useZReadReports;
