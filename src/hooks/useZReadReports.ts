import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { ZReadReportsService } from '../services';
import { Create, Params } from '../services/ZReadReportsService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { ZReadReport } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useZReadReports = (
	data: UseListQuery<ZReadReport, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<ZReadReport>,
		Error,
		QueryResponse<ZReadReport>
	>(
		['useZReadReports', params],
		() =>
			wrapServiceWithCatch(
				ZReadReportsService.list(
					{
						branch_machine_id: params?.branchMachineId,
						branch_machine_name: params?.branchMachineName,
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

export const useZReadReportCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<
		AxiosResponse<ZReadReport>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
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
