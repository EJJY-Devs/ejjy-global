import { useQuery } from 'react-query';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { DiscountOptionsService } from '../services';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { DiscountOption } from '../types';
import { convertParamsToArray, wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';
import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/DiscountOptionsService';

const useDiscountOptions = (
	data: UseListQuery<DiscountOption, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<DiscountOption>,
		Error,
		QueryResponse<DiscountOption>
	>(
		[
			'useDiscountOptions',
			...convertParamsToArray<CamelCasedProperties<Params>>(params),
		],
		async () =>
			wrapServiceWithCatch(
				DiscountOptionsService.list(
					{
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						is_special_discount: params?.isSpecialDiscount || undefined,
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
