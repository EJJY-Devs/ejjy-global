import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { BranchDaysService } from '../services';
import { Create, Edit } from '../services/BranchDaysService';
import { AxiosErrorResponse } from '../services/interfaces';
import { BranchDay } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseRetrieveQuery } from './inteface';

export const useBranchDayRetrieve = (
	data: Partial<UseRetrieveQuery<BranchDay>> = {},
) => {
	const { options, serviceOptions } = data;

	return useQuery<BranchDay>(
		['useBranchDayRetrieve'],
		() =>
			wrapServiceWithCatch(
				BranchDaysService.retrieveToday(serviceOptions?.baseURL),
			),
		options,
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
	>(({ id, branchMachineId, endedById, isAutomaticallyClosed }) =>
		BranchDaysService.edit({
			id,
			branch_machine_id: branchMachineId,
			ended_by_id: endedById,
			is_automatically_closed: isAutomaticallyClosed,
		}),
	);
