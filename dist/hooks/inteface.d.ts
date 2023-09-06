import { UseMutationOptions, UseQueryOptions } from 'react-query';
import { ListResponseData, QueryResponse } from '../services/interfaces';
export interface UseListQuery<T = any> {
    id?: number;
    params?: any;
    options?: ListQueryOptions<T>;
}
export interface UseRetrieveQuery<T> {
    id: number;
    options?: UseQueryOptions<T>;
}
export interface Mutate {
    options?: UseMutationOptions;
}
export interface ListQueryOptions<T> extends UseQueryOptions<ListResponseData<T>, Error, QueryResponse<T>> {
}
