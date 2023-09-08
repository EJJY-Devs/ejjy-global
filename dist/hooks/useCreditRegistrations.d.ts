import { QueryResponse } from '../services/interfaces';
import { CreditRegistration } from '../types';
import { UseListQuery } from './inteface';
declare const useCreditRegistrations: (data?: UseListQuery<CreditRegistration>) => import("react-query").UseQueryResult<QueryResponse<CreditRegistration>, Error>;
export default useCreditRegistrations;
