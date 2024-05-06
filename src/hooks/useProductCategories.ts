import { AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { ProductCategoriesService } from '../services';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { Modify } from '../services/ProductCategoriesService';
import { ProductCategory } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useProductCategories = (data: UseListQuery<ProductCategory> = {}) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<ProductCategory>,
		Error,
		QueryResponse<ProductCategory>
	>(
		['useProductCategories', params],
		() =>
			wrapServiceWithCatch(
				ProductCategoriesService.list(
					{
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						page: params?.page || DEFAULT_PAGE,
					},
					serviceOptions?.baseURL,
					serviceOptions?.type,
				),
			),
		{
			placeholderData: {
				results: [],
				count: 0,
			},
			select: (query) => ({
				list: query.results,
				total: query.count,
			}),
			...options,
		},
	);
};

export const useProductCategoryCreate = (
	options?: UseMutationOptions<
		AxiosResponse<ProductCategory>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<ProductCategory>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify>
	>(
		({ name, priorityLevel }) =>
			ProductCategoriesService.create(
				{
					name,
					priority_level: priorityLevel,
				},
				baseURL,
			),
		options,
	);

export const useProductCategoryEdit = (
	options?: UseMutationOptions<
		AxiosResponse<ProductCategory>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify & { id: number }>
	>,
	baseURL?: string,
) =>
	useMutation<
		AxiosResponse<ProductCategory>,
		AxiosErrorResponse,
		CamelCasedProperties<Modify & { id: number }>
	>(
		({ id, name, priorityLevel }) =>
			ProductCategoriesService.edit(
				id,
				{
					name,
					priority_level: priorityLevel,
				},
				baseURL,
			),
		options,
	);

export const useProductCategoryDelete = (
	options?: UseMutationOptions<AxiosResponse<void>, AxiosErrorResponse, number>,
	baseURL?: string,
) =>
	useMutation<AxiosResponse<void>, AxiosErrorResponse, number>(
		(id: number) => ProductCategoriesService.delete(id, baseURL),
		options,
	);

export default useProductCategories;
