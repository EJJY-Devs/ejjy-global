import { useQuery } from 'react-query';
import { DEFAULT_PAGE, MAX_PAGE_SIZE } from '../globals';
import { CreditRegistrationsService } from '../services';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { CreditRegistration } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useCreditRegistrations = (
	data: UseListQuery<CreditRegistration> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<CreditRegistration>,
		Error,
		QueryResponse<CreditRegistration>
	>(
		['useCreditRegistrations', params],
		() =>
			wrapServiceWithCatch(
				CreditRegistrationsService.list(
					{
						search: params?.search,
						page: DEFAULT_PAGE,
						page_size: MAX_PAGE_SIZE,
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

export default useCreditRegistrations;
