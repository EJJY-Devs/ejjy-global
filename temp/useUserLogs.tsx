import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useQuery } from 'react-query';
import { UserLogsService } from 'services';

const useUserLogs = ({ params }: UseListQuery) =>
	useQuery<any>(
		[
			'useUserLogs',
			params?.actingUserId,
			params?.page,
			params?.pageSize,
			params?.timeRange,
			params?.type,
		],
		() =>
			wrapServiceWithCatch(
				UserLogsService.list({
					acting_user_id: params?.actingUserId,
					page: params?.page || DEFAULT_PAGE,
					page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
					time_range: params?.timeRange,
					type: params?.type,
				}),
			),
		{
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				userLogs: query.data.results,
				total: query.data.count,
			}),
		},
	);

export default useUserLogs;
