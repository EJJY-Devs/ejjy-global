import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useQuery } from 'react-query';
import { OrderOfPaymentsService } from 'services';

const useOrderOfPayments = ({ params, options }: UseListQuery) =>
	useQuery<any>(
		['useOrderOfPayments', params?.page, params?.pageSize, params?.isPending],
		() =>
			wrapServiceWithCatch(
				OrderOfPaymentsService.list({
					page: params?.page || DEFAULT_PAGE,
					page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
					is_pending: params?.isPending,
				}),
			),
		{
			initialData: { data: { results: [], count: 0 } },
			select: (query) => ({
				orderOfPayments: query.data.results,
				total: query.data.count,
			}),
			...options,
		},
	);

export default useOrderOfPayments;
