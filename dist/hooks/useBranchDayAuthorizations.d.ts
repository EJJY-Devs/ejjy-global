import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/BranchDayAuthorizationsService';
import { QueryResponse } from '../services/interfaces';
import { BranchDayAuthorization } from '../types';
import { UseListQuery } from './inteface';
declare const useBranchDayAuthorizations: (data?: UseListQuery<BranchDayAuthorization, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<BranchDayAuthorization>, Error>;
export default useBranchDayAuthorizations;
