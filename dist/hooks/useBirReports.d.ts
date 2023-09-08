import { QueryResponse } from '../services/interfaces';
import { BirReport } from '../types';
import { UseListQuery, UseListQueryParams } from './inteface';
interface ListQueryParams extends UseListQueryParams {
    branchMachineId?: number;
}
declare const useBirReports: (data?: UseListQuery<BirReport, ListQueryParams>) => import("react-query").UseQueryResult<QueryResponse<BirReport>, Error>;
export default useBirReports;
