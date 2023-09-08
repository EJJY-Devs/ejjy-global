import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { SalesTrackerService } from '../services';
import { Params, Reset } from '../services/SalesTrackerService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { SalesTracker } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useSalesTrackers = (
	data: UseListQuery<SalesTracker, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<SalesTracker>,
		Error,
		QueryResponse<SalesTracker>
	>(
		['useSalesTracker', params],
		() =>
			wrapServiceWithCatch(
				SalesTrackerService.list(
					{
						branch_machine_id: params?.branchMachineId,
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
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

export const useSalesTrackerReset = () =>
	useMutation<
		AxiosResponse<SalesTracker>,
		AxiosErrorResponse,
		CamelCasedProperties<Reset>
	>(({ branchMachineId }) =>
		SalesTrackerService.reset({
			branch_machine_id: branchMachineId,
		}),
	);

export default useSalesTrackers;
