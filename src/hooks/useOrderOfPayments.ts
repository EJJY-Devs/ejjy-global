import { useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { OrderOfPaymentsService } from '../services';
import { Params } from '../services/OrderOfPaymentsService';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { OrderOfPayment } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useOrderOfPayments = (
	data: UseListQuery<OrderOfPayment, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<OrderOfPayment>,
		Error,
		QueryResponse<OrderOfPayment>
	>(
		['useOrderOfPayments', params],
		() =>
			wrapServiceWithCatch(
				OrderOfPaymentsService.list(
					{
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						is_pending: params?.isPending,
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

export default useOrderOfPayments;
