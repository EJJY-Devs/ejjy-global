import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/UserLogsService';
import { QueryResponse } from '../services/interfaces';
import { UserLog } from '../types';
import { UseListQuery } from './inteface';
declare const useUserLogs: (data?: UseListQuery<UserLog, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<UserLog>, Error>;
export default useUserLogs;
