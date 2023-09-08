import { CashieringSession } from 'ejjy-global';
import { UseListQuery } from 'hooks/inteface';
interface ListQuery extends UseListQuery<CashieringSession> {
    params?: {
        page?: number;
        pageSize?: number;
        timeRange?: string;
    };
}
declare const useCashieringSessions: (data?: ListQuery) => import("react-query").UseQueryResult<QueryResponse<CashieringSession>, Error>;
export declare const useCashieringSessionRetrieve: (data: UseRetrieveQuery<CashieringSession>) => import("react-query").UseQueryResult<CashieringSession, unknown>;
export declare const useCashieringSessionValidate: ({ options }?: Mutate) => import("react-query").UseMutationResult<any, any, any, unknown>;
export declare const useCashieringSessionStart: () => import("react-query").UseMutationResult<any, any, any, unknown>;
export declare const useCashieringSessionEnd: () => import("react-query").UseMutationResult<any, any, any, unknown>;
export default useCashieringSessions;
