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
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<XReadReport>,
		Error,
		QueryResponse<XReadReport>
	>(
		[
			'useXReadReports',
			params?.branchMachineId,
			params?.branchMachineName,
			params?.isWithDailySalesData,
			params?.pageSize,
			params?.page,
			params?.timeRange,
		],
		() =>
			wrapServiceWithCatch(
				XReadReportsService.list(
					{
						branch_machine_id: params?.branchMachineId,
						branch_machine_name: params?.branchMachineName,
						is_with_daily_sales_data: params?.isWithDailySalesData,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						page: params?.page || DEFAULT_PAGE,
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
