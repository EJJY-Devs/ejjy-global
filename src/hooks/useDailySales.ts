import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import DailySalesService, {
	Create,
	Params,
} from '../services/DailySalesService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { DailySales } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useDailySales = (
	data: UseListQuery<DailySales, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<DailySales>,
		Error,
		QueryResponse<DailySales>
	>(
		['useDailySales', params],
		() =>
			wrapServiceWithCatch(
				DailySalesService.list(
					{
						is_with_daily_sales_data: params?.isWithDailySalesData,
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						time_range: params?.timeRange,
					},
					serviceOptions?.baseURL,
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

export const useDailySalesCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<
		AxiosResponse<DailySales>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(
		({ cashieringSessionIds, generatedById: userId }) =>
			DailySalesService.create({
				generated_by_id: userId,
				cashiering_session_ids: cashieringSessionIds,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('useDailySales');
			},
		},
	);
};

export default useDailySales;
