import { UseMutationOptions, UseQueryOptions } from 'react-query';
import { ServiceType } from '../globals/enums';
import { ListResponseData, QueryResponse } from '../services/interfaces';
export interface UseListQuery<T = any, TParams extends UseListQueryParams = UseListQueryParams> {
    params?: TParams;
    options?: UseListQueryOptions<T>;
    serviceOptions?: ServiceOptions;
}
export interface UseRetrieveQuery<T = any> extends Omit<UseListQuery<T>, 'options'> {
    id: number;
    options?: UseRetrieveQueryOptions<T>;
}
export interface Mutate {
    options?: UseMutationOptions;
}
type UseListQueryOptions<T> = UseQueryOptions<ListResponseData<T>, Error, QueryResponse<T>>;
type UseRetrieveQueryOptions<T> = UseQueryOptions<T>;
export interface UseListQueryParams {
    ordering?: string;
    page?: number;
    pageSize?: number;
    fields?: string;
    search?: string;
    timeRange?: string;
}
interface ServiceOptions {
    type?: ServiceType;
    baseURL?: string;
}
export {};
