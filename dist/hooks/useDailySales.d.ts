import { AxiosResponse } from 'axios';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/DailySalesService';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { DailySales } from '../types';
import { UseListQuery } from './inteface';
declare const useDailySales: (data?: UseListQuery<DailySales, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<DailySales>, Error>;
export declare const useDailySalesCreate: () => import("react-query").UseMutationResult<AxiosResponse<DailySales>, AxiosErrorResponse<any>, {
    generatedById: number;
    cashieringSessionIds: string;
}, unknown>;
export default useDailySales;
