import { AxiosError } from 'axios';
import { ServiceType } from '../globals/enums';

export interface ListQueryParams {
	ordering?: string;
	page?: number;
	page_size?: number;
	fields?: string;
	search?: string;
	time_range?: string;
}

export interface ListResponseData<T> {
	count: number;
	next?: string;
	previous?: string;
	results: T[];
}

export interface QueryResponse<T> {
	list: T[];
	total: number;
}

export type Endpoints = Record<ServiceType, string>;

export interface AxiosErrorResponse<T = any> extends AxiosError<T> {
	errors?: string | string[];
}
