import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, MAX_PAGE_SIZE, timeRangeTypes } from '../globals';
import { TransactionsService } from '../services';
import {
	ComputeDiscount,
	ComputeDiscountResponse,
	Params,
} from '../services/TransactionsService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { Transaction } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery } from './inteface';

const useTransactions = (
	data: UseListQuery<Transaction, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<Transaction>,
		Error,
		QueryResponse<Transaction>
	>(
		['useTransactions', params],
		() =>
			wrapServiceWithCatch(
				TransactionsService.list({
					is_adjusted: params?.isAdjusted,
					page_size: params?.pageSize || MAX_PAGE_SIZE,
					page: params?.page || DEFAULT_PAGE,
					statuses: params?.statuses,
					teller_id: params?.tellerId,
					time_range: params?.timeRange || timeRangeTypes.DAILY,
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

export const useTransactionRetrieve = (data: UseRetrieveQuery<Transaction>) => {
	const { id, options, serviceOptions } = data;

	return useQuery<any>(
		['useTransactionRetrieve', id],
		() => TransactionsService.retrieve(id, serviceOptions?.baseURL),
		{
			enabled: typeof id === 'number',
			...options,
		},
	);
};

export const useTransactionComputeDiscount = () =>
	useMutation<
		AxiosResponse<ComputeDiscountResponse>,
		AxiosErrorResponse,
		CamelCasedProperties<ComputeDiscount>
	>(({ branchProducts, discountAmount, discountOptionId }: any) =>
		TransactionsService.compute({
			branch_products: branchProducts,
			discount_amount: discountAmount,
			discount_option_id: discountOptionId,
		}),
	);

export default useTransactions;
