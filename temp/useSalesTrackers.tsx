import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useMutation, useQuery } from 'react-query';
import { SalesTrackerService } from 'services';

const useSalesTrackers = ({ params, options }: UseListQuery) =>
	useQuery<any>(
		[
			'useSalesTracker',
			params?.branchMachineId,
			params?.page,
			params?.pageSize,
		],
		() =>
			wrapServiceWithCatch(
				SalesTrackerService.list({
					branch_machine_id: params?.branchMachineId,
					page: params?.page || DEFAULT_PAGE,
					page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
				}),
			),
		{
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				salesTrackers: query.data.results,
				total: query.data.count,
			}),
			...options,
		},
	);

export const useSalesTrackerReset = () =>
	useMutation<any, any, any>(({ branchMachineId }) =>
		SalesTrackerService.reset({
			branch_machine_id: branchMachineId,
		}),
	);

export default useSalesTrackers;
