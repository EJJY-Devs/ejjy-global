import { QueryResponse } from '../services/interfaces';
import { ResetLog } from '../types';
import { UseListQuery } from './inteface';
declare const useResetLogs: (data?: UseListQuery<ResetLog>) => import("react-query").UseQueryResult<QueryResponse<ResetLog>, Error>;
export default useResetLogs;
