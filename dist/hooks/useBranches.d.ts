import { QueryResponse } from "../services/interfaces";
import { Branch } from "../types";
import { UseListQuery } from "./inteface";
interface ListQuery extends UseListQuery<Branch> {
    params?: {
        page?: number;
        pageSize?: number;
    };
}
declare const useBranches: (data?: ListQuery) => import("react-query").UseQueryResult<QueryResponse<Branch>, Error>;
export default useBranches;
