import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import DailySalesService from '../services/DailySalesService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { DailySales } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseListQueryParams } from './inteface';

interface ListQueryParams extends UseListQueryParams {
	isWithDailySalesData?: boolean;
}

const useDailySales = (
	data: UseListQuery<DailySales, ListQueryParams> = {},
) => {
	const { params, options } = data;

	return useQuery<
		ListResponseData<DailySales>,
		Error,
		QueryResponse<DailySales>
	>(
		['useDailySales', params],
		() =>
			wrapServiceWithCatch(
				DailySalesService.list({
					is_with_daily_sales_data: params?.isWithDailySalesData,
					page: params?.page || DEFAULT_PAGE,
					page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
					time_range: params?.timeRange,
				}),
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

interface CreateBody {
	cashieringSessionIds: string;
	userId: number;
}

export const useDailySalesCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<AxiosResponse<DailySales>, AxiosErrorResponse, CreateBody>(
		({ cashieringSessionIds, userId }) =>
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
