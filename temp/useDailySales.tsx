import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DailySalesService } from 'services';

const useDailySales = ({ params, options }: UseListQuery) =>
	useQuery<any>(
		[
			'useDailySales',
			params?.isWithDailySalesData,
			params?.page,
			params?.pageSize,
			params?.timeRange,
		],
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
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				dailySales: query.data.results,
				total: query.data.count,
			}),
			...options,
		},
	);

export const useDailySalesCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<any, any, any>(
		({ cashieringSessionIds, userId }: any) =>
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
