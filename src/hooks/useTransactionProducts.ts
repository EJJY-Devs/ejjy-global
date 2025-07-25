import { useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { timeRangeTypes } from '../globals';
import { TransactionProductsService } from '../services';
import { ListResponseData, QueryResponse } from '../services/interfaces';
import { TransactionProduct } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

interface TransactionProductParams {
	isVatExempted?: boolean;
	orNumber?: boolean;
	page?: number;
	pageSize?: number;
	statuses?: string;
	timeRange?: string;
	branchId?: number | string;
}

export const useTransactionProducts = (
	data: UseListQuery<
		TransactionProduct,
		CamelCasedProperties<TransactionProductParams>
	> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<TransactionProduct>,
		Error,
		QueryResponse<TransactionProduct>
	>(
		[
			'useTransactionProducts',
			params?.isVatExempted,
			params?.orNumber,
			params?.page,
			params?.pageSize,
			params?.statuses,
			params?.timeRange,
			params?.branchId,
		],
		() =>
			wrapServiceWithCatch(
				TransactionProductsService.list(
					{
						is_vat_exempted: params?.isVatExempted,
						or_number: params?.orNumber,
						page_size: params?.pageSize,
						page: params?.page,
						statuses: params?.statuses,
						time_range: params?.timeRange || timeRangeTypes.DAILY,
						branch_id: params?.branchId,
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

export default useTransactionProducts;
