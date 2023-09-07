import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { ZReadReportsService } from '../services';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { ZReadReport } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseListQueryParams } from './inteface';
import { AxiosResponse } from 'axios';

interface ListQueryParams extends UseListQueryParams {
	branchMachineId?: number;
	branchMachineName?: string;
}

const useZReadReports = (
	data: UseListQuery<ZReadReport, ListQueryParams> = {},
) => {
	const { params, options } = data;

	return useQuery<
		ListResponseData<ZReadReport>,
		Error,
		QueryResponse<ZReadReport>
	>(
		['useZReadReports', params],
		() =>
			wrapServiceWithCatch(
				ZReadReportsService.list({
					branch_machine_id: params?.branchMachineId,
					branch_machine_name: params?.branchMachineName,
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

export const useZReadReportCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<
		AxiosResponse<ZReadReport>,
		AxiosErrorResponse,
		CreateBody
	>(
		({ branchMachineId, date, userId }) =>
			ZReadReportsService.create({
				branch_machine_id: branchMachineId,
				date,
				user_id: userId,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('useZReadReports');
			},
		},
	);
};

export default useZReadReports;
