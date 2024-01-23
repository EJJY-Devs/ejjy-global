import { UseMutationOptions, UseQueryOptions } from 'react-query';
import { ServiceType } from '../globals/enums';
import { ListResponseData, QueryResponse } from '../services/interfaces';

export interface UseListQuery<
	T,
	TParams extends UseListQueryParams = UseListQueryParams,
	TOptions = UseListQueryOptions<T>,
> {
	params?: TParams;
	options?: TOptions;
	serviceOptions?: ServiceOptions;
}

export interface UseRetrieveQuery<T> extends Omit<UseListQuery<T>, 'options'> {
	id: number;
	options?: UseRetrieveQueryOptions<T>;
}

export interface Mutate {
	options?: UseMutationOptions;
}

type UseListQueryOptions<T> = UseQueryOptions<
	ListResponseData<T>,
	Error,
	QueryResponse<T>
>;

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
