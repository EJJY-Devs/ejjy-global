import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { XReadReportsService } from '../services';
import { Create, Params } from '../services/XReadReportsService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { XReadReport } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useXReadReports = (
	data: UseListQuery<XReadReport, CamelCasedProperties<Params>> = {},
) => {
	const { params, options } = data;

	return useQuery<
		ListResponseData<XReadReport>,
		Error,
		QueryResponse<XReadReport>
	>(
		['useXReadReports', params],
		() =>
			wrapServiceWithCatch(
				XReadReportsService.list({
					branch_machine_id: params?.branchMachineId,
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

export const useXReadReportCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<
		AxiosResponse<XReadReport>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(
		({ branchMachineId, date, userId }) =>
			XReadReportsService.create({
				branch_machine_id: branchMachineId,
				date,
				user_id: userId,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('useXReadReports');
			},
		},
	);
};

export default useXReadReports;
