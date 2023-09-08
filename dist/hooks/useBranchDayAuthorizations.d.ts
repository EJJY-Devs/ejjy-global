import { QueryResponse } from '../services/interfaces';
import { BranchDayAuthorization } from '../types';
import { UseListQuery, UseListQueryParams } from './inteface';
interface ListQueryParams extends UseListQueryParams {
    branchId?: number;
}
declare const useBranchDayAuthorizations: (data?: UseListQuery<BranchDayAuthorization, ListQueryParams>) => import("react-query").UseQueryResult<QueryResponse<BranchDayAuthorization>, Error>;
export default useBranchDayAuthorizations;
