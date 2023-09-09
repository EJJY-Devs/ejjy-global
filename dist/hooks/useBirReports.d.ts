import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/BirReportsService';
import { QueryResponse } from '../services/interfaces';
import { BirReport } from '../types';
import { UseListQuery } from './inteface';
declare const useBirReports: (data?: UseListQuery<BirReport, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<BirReport>, Error>;
export default useBirReports;
