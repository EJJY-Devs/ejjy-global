import { AxiosResponse } from 'axios';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { DailySales } from '../types';
import { UseListQuery, UseListQueryParams } from './inteface';
interface ListQueryParams extends UseListQueryParams {
    isWithDailySalesData?: boolean;
}
declare const useDailySales: (data?: UseListQuery<DailySales, ListQueryParams>) => import("react-query").UseQueryResult<QueryResponse<DailySales>, Error>;
interface CreateBody {
    cashieringSessionIds: string;
    userId: number;
}
export declare const useDailySalesCreate: () => import("react-query").UseMutationResult<AxiosResponse<DailySales>, AxiosErrorResponse<any>, CreateBody, unknown>;
export default useDailySales;
