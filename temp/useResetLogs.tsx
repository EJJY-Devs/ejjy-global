import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useQuery } from 'react-query';
import { ResetLogsService } from 'services';

const useResetLogs = ({ params, options }: UseListQuery = {}) =>
	useQuery<any>(
		['useResetLogs', params?.page, params?.pageSize],
		() =>
			wrapServiceWithCatch(
				ResetLogsService.list({
					page: params?.page || DEFAULT_PAGE,
					page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
				}),
			),
		{
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				resetLogs: query.data.results,
				total: query.data.count,
			}),
			...options,
		},
	);

export default useResetLogs;
