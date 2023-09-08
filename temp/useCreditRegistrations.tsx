import { DEFAULT_PAGE, MAX_PAGE_SIZE } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { useQuery } from 'react-query';
import { CreditRegistrationsService } from 'services';
import { UseListQuery } from './inteface';

const useCreditRegistrations = ({ params, options }: UseListQuery = {}) =>
	useQuery<any>(
		['useCreditRegistrations', params?.search],
		() =>
			wrapServiceWithCatch(
				CreditRegistrationsService.list({
					search: params?.search,
					page: DEFAULT_PAGE,
					page_size: MAX_PAGE_SIZE,
				}),
			),
		{
			cacheTime: 30000,
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				creditRegistrations: query.data.results,
				total: query.data.count,
			}),
			...options,
		},
	);

export default useCreditRegistrations;
