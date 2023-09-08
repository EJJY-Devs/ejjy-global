import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useMutation, useQuery } from 'react-query';
import { BranchDaysService } from 'services';

export const useBranchDayRetrieve = ({ options }: UseListQuery = {}) =>
	useQuery<any>(
		['useBackOrderRetrieve'],
		() => wrapServiceWithCatch(BranchDaysService.retrieveToday()),
		{
			select: (query) => query.data,
			...options,
		},
	);

export const useBranchDayCreate = () =>
	useMutation<any, any, any>(({ branchMachineId, startedById }: any) =>
		BranchDaysService.create({
			branch_machine_id: branchMachineId,
			started_by_id: startedById,
		}),
	);

export const useBranchDayEdit = () =>
	useMutation<any, any, any>(
		({ id, branchMachineId, endedById, isAutomaticallyClosed }: any) =>
			BranchDaysService.edit(id, {
				branch_machine_id: branchMachineId,
				ended_by_id: endedById,
				is_automatically_closed: isAutomaticallyClosed,
			}),
	);
