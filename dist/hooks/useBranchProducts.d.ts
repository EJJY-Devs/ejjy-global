import { CamelCasedProperties } from 'type-fest';
import { ParamsOffline } from '../services/BranchProductsService';
import { QueryResponse } from '../services/interfaces';
import { BranchProduct } from '../types';
import { UseListQuery } from './inteface';
export declare const useBranchProductsOffline: (data?: UseListQuery<BranchProduct, CamelCasedProperties<ParamsOffline>>) => import("react-query").UseQueryResult<QueryResponse<BranchProduct>, Error>;
