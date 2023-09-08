import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useMutation, useQuery } from 'react-query';
import { BranchMachinesService } from 'services';
import { ListResponseData, QueryResponse } from 'services/interfaces';
import { BranchMachine } from 'ejjy-global';

interface ListQuery extends UseListQuery<BranchMachine> {
	params?: {
		branchId?: number;
	};
}

const useBranchMachines = (data: ListQuery = {}) => {
	const { params, options } = data;

	return useQuery<
		ListResponseData<BranchMachine>,
		Error,
		QueryResponse<BranchMachine>
	>(
		['useBranchMachines', params?.branchId],
		() =>
			wrapServiceWithCatch(
				BranchMachinesService.list({
					branch_id: params?.branchId,
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

export const useBranchMachineRetrieve = () =>
	useMutation<any, any, any>((id) => BranchMachinesService.retrieve(id));

export const useBranchMachinePing = () =>
	useMutation<any, any, any>(({ id }: any) =>
		BranchMachinesService.ping({
			online_branch_machine_id: id,
		}),
	);

export default useBranchMachines;
