import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useQuery } from 'react-query';
import { BirReportsService } from 'services';

const useBirReports = ({ params, options }: UseListQuery) =>
	useQuery<any>(
		[
			'useBirReports',
			params?.branchMachineId,
			params?.page,
			params?.pageSize,
			params?.timeRange,
		],
		async () =>
			wrapServiceWithCatch(
				BirReportsService.list({
					branch_machine_id: params?.branchMachineId,
					page: params?.page || DEFAULT_PAGE,
					page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
					time_range: params?.timeRange,
				}),
			),
		{
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				birReports: query.data.results,
				total: query.data.count,
			}),
			...options,
		},
	);

export default useBirReports;
