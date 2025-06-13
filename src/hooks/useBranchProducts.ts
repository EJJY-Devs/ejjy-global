import { useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { BranchProductsService } from '../services';
import { Params } from '../services/BranchProductsService';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { BranchProduct } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

export const useBranchProducts = (
	data: UseListQuery<BranchProduct, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<BranchProduct>,
		Error,
		QueryResponse<BranchProduct>
	>(
		['useBranchProducts', params],
		() =>
			wrapServiceWithCatch(
				BranchProductsService.list(
					{
						branch_id: params?.branchId,
						identifier: params?.identifier,
						is_shown_in_scale_list: params?.isShownInScaleList,
						is_sold_in_branch: params?.isSoldInBranch,
						ordering: params?.ordering,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						page: params?.page || DEFAULT_PAGE,
						search: params?.search,
						unit_of_measurement: params?.unitOfMeasurement,
						barcode: params?.barcode,
						search_by: params?.searchBy,
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
