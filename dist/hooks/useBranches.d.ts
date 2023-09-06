import { QueryResponse } from '../services/interfaces';
import { Branch } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
interface ListQuery extends UseListQuery<Branch> {
    params?: {
        page?: number;
        pageSize?: number;
    };
}
declare const useBranches: (data?: ListQuery) => import("react-query").UseQueryResult<QueryResponse<Branch>, Error>;
export declare const useBranchRetrieve: (data: UseRetrieveQuery<Branch>) => import("react-query").UseQueryResult<Branch, Error>;
export default useBranches;
