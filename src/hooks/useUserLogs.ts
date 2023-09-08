import { useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { UserLogsService } from '../services';
import { Params } from '../services/UserLogsService';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { UserLog } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useUserLogs = (
	data: UseListQuery<UserLog, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<ListResponseData<UserLog>, Error, QueryResponse<UserLog>>(
		['useUserLogs', params],
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

export default useUserLogs;
