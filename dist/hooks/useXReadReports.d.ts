import { AxiosResponse } from 'axios';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { XReadReport } from '../types';
import { UseListQuery, UseListQueryParams } from './inteface';
interface ListQueryParams extends UseListQueryParams {
    branchMachineId?: number;
    isWithDailySalesData?: boolean;
}
declare const useXReadReports: (data?: UseListQuery<XReadReport, ListQueryParams>) => import("react-query").UseQueryResult<QueryResponse<XReadReport>, Error>;
interface CreateBody {
    branchMachineId: number;
    date: string;
    userId: number;
}
export declare const useXReadReportCreate: () => import("react-query").UseMutationResult<AxiosResponse<XReadReport>, AxiosErrorResponse<any>, CreateBody, unknown>;
export default useXReadReports;
