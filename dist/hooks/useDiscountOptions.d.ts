import { QueryResponse } from '../services/interfaces';
import { DiscountOption } from '../types';
import { UseListQuery } from './inteface';
declare const useDiscountOptions: (data?: UseListQuery<DiscountOption>) => import("react-query").UseQueryResult<QueryResponse<DiscountOption>, Error>;
export default useDiscountOptions;
