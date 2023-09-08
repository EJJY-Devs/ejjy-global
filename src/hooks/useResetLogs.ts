import { useQuery } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { ResetLogsService } from '../services';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { ResetLog } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useResetLogs = (data: UseListQuery<ResetLog> = {}) => {
	const { params, options, serviceOptions } = data;

	return useQuery<ListResponseData<ResetLog>, Error, QueryResponse<ResetLog>>(
		['useResetLogs', params],
		() =>
			wrapServiceWithCatch(
				ResetLogsService.list(
					{
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
					},
					serviceOptions?.baseURL,
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

export default useResetLogs;
