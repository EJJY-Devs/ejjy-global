import { QueryResponse } from '../services/interfaces';
import { DiscountOption } from '../types';
import { UseListQuery } from './inteface';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/DiscountOptionsService';
declare const useDiscountOptions: (data?: UseListQuery<DiscountOption, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<DiscountOption>, Error>;
export default useDiscountOptions;
