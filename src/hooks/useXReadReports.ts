import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { XReadReportsService } from '../services';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { XReadReport } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseListQueryParams } from './inteface';

interface ListQueryParams extends UseListQueryParams {
	branchMachineId?: number;
	isWithDailySalesData?: boolean;
}

const useXReadReports = (
	data: UseListQuery<XReadReport, ListQueryParams> = {},
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

interface CreateBody {
	branchMachineId: number;
	date: string;
	userId: number;
}

export const useXReadReportCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<
		AxiosResponse<XReadReport>,
		AxiosErrorResponse,
		CreateBody
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
