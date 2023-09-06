import { UseMutationOptions, UseQueryOptions } from 'react-query';
import { ServiceType } from '../globals/enums';
import { ListResponseData, QueryResponse } from '../services/interfaces';

// TODO Remove any once strict is set to `true`
export interface UseListQuery<
	T = any,
	TParams extends UseListQueryParams = UseListQueryParams,
> {
	params?: TParams;
	options?: UseListQueryOptions<T>;
	serviceOptions?: ServiceOptions;
}

export interface UseRetrieveQuery<T = any>
	extends Omit<UseListQuery<T>, 'options'> {
	id: number;
	options?: UseRetrieveQueryOptions<T>;
}

export interface Mutate {
	options?: UseMutationOptions;
}

interface UseListQueryOptions<T>
	extends UseQueryOptions<ListResponseData<T>, Error, QueryResponse<T>> {}

interface UseRetrieveQueryOptions<T> extends UseQueryOptions<T> {}

export interface UseListQueryParams {
	ordering?: string;
	page?: number;
	pageSize?: number;
	fields?: string;
	search?: string;
}

interface ServiceOptions {
	type: ServiceType;
	baseURL: string;
}
