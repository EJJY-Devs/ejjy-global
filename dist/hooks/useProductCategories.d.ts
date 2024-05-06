import { AxiosResponse } from 'axios';
import { UseMutationOptions } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { AxiosErrorResponse, QueryResponse } from '../services/interfaces';
import { Modify } from '../services/ProductCategoriesService';
import { ProductCategory } from '../types';
import { UseListQuery } from './inteface';
declare const useProductCategories: (data?: UseListQuery<ProductCategory>) => import("react-query").UseQueryResult<QueryResponse<ProductCategory>, Error>;
export declare const useProductCategoryCreate: (options?: UseMutationOptions<AxiosResponse<ProductCategory>, AxiosErrorResponse, CamelCasedProperties<Modify>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<ProductCategory>, AxiosErrorResponse<any>, {
    name: string;
    priorityLevel: number;
}, unknown>;
export declare const useProductCategoryEdit: (options?: UseMutationOptions<AxiosResponse<ProductCategory>, AxiosErrorResponse, CamelCasedProperties<Modify & {
    id: number;
}>>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<ProductCategory>, AxiosErrorResponse<any>, {
    name: string;
    priorityLevel: number;
    id: number;
}, unknown>;
export declare const useProductCategoryDelete: (options?: UseMutationOptions<AxiosResponse<void>, AxiosErrorResponse, number>, baseURL?: string) => import("react-query").UseMutationResult<AxiosResponse<void>, AxiosErrorResponse<any>, number, unknown>;
export default useProductCategories;
