import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/BranchProductsService';
import { QueryResponse } from '../services/interfaces';
import { BranchProduct } from '../types';
import { UseListQuery } from './inteface';
export declare const useBranchProducts: (data?: UseListQuery<BranchProduct, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<BranchProduct>, Error>;
