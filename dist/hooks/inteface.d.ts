import { UseMutationOptions, UseQueryOptions } from 'react-query';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { ServiceType } from '../globals/enums';
export interface UseListQuery<T = any> {
    params?: any;
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
interface UseListQueryOptions<T> extends UseQueryOptions<ListResponseData<T>, Error, QueryResponse<T>> {
}
interface UseRetrieveQueryOptions<T> extends UseQueryOptions<T, Error, T> {
}
interface ServiceOptions {
    type: ServiceType;
    baseURL: string;
}
export {};
