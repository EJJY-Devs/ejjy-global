import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { BranchDaysService } from '../services';
import { Create, Edit } from '../services/BranchDaysService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { BranchDay } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

export const useBranchDayRetrieve = (data: UseListQuery<BranchDay> = {}) => {
	const { options, serviceOptions } = data;

	return useQuery<ListResponseData<BranchDay>, Error, QueryResponse<BranchDay>>(
		['useBranchDayRetrieve'],
		() =>
			wrapServiceWithCatch(
				BranchDaysService.retrieveToday(serviceOptions?.baseURL),
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

export const useBranchDayCreate = () =>
	useMutation<
		AxiosResponse<BranchDay>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(({ branchMachineId, startedById }) =>
		BranchDaysService.create({
			branch_machine_id: branchMachineId,
			started_by_id: startedById,
		}),
	);

export const useBranchDayEdit = () =>
	useMutation<
		AxiosResponse<BranchDay>,
		AxiosErrorResponse,
		CamelCasedProperties<Edit>
	>(({ id, branchMachineId, endedById, isAutomaticallyClosed }: any) =>
		BranchDaysService.edit(id, {
			branch_machine_id: branchMachineId,
			ended_by_id: endedById,
			is_automatically_closed: isAutomaticallyClosed,
		}),
	);
