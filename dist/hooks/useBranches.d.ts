import { QueryResponse } from '../services/interfaces';
import { Branch } from '../types';
import { UseListQuery, UseRetrieveQuery } from './inteface';
declare const useBranches: (data?: UseListQuery<Branch>) => import("react-query").UseQueryResult<QueryResponse<Branch>, Error>;
export declare const useBranchRetrieve: (data: UseRetrieveQuery<Branch>) => import("react-query").UseQueryResult<Branch, unknown>;
export default useBranches;
