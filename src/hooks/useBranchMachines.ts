import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { BranchMachinesService } from '../services';
import { Params } from '../services/BranchMachinesService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { BranchMachine } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery } from './inteface';

const useBranchMachines = (
	data: UseListQuery<BranchMachine, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<BranchMachine>,
		Error,
		QueryResponse<BranchMachine>
	>(
		['useBranchMachines', params],
		() =>
			wrapServiceWithCatch(
				BranchMachinesService.list(
					{
						branch_id: params?.branchId,
					},
					serviceOptions?.baseURL,
					serviceOptions?.type,
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

export const useBranchMachineRetrieve = (
	data: UseRetrieveQuery<BranchMachine>,
) => {
	const { id, options, serviceOptions } = data;

	useQuery<BranchMachine>(
		['useBranchMachineRetrieve', id],
		() =>
			wrapServiceWithCatch(
				BranchMachinesService.retrieve(
					id,
					serviceOptions?.baseURL,
					serviceOptions?.type,
				),
			),
		{
			enabled: typeof id === 'number',
			...options,
		},
	);
};

export const useBranchMachinePing = () =>
	useMutation<AxiosResponse<boolean>, AxiosErrorResponse, number>(
		(id: number) =>
			BranchMachinesService.ping({
				online_branch_machine_id: id,
			}),
	);

export default useBranchMachines;
