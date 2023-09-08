import { useQuery } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { DiscountOptionsService } from '../services';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { DiscountOption } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useDiscountOptions = (data: UseListQuery<DiscountOption> = {}) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<DiscountOption>,
		Error,
		QueryResponse<DiscountOption>
	>(
		['useDiscountOptions', params],
		async () =>
			wrapServiceWithCatch(
				DiscountOptionsService.list(
					{
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
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

export default useDiscountOptions;
