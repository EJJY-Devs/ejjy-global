import { AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, timeRangeTypes } from '../globals';
import { CollectionReceiptsService } from '../services';
import { Create, Params } from '../services/CollectionReceiptsService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { CollectionReceipt } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery } from './inteface';

const useCollectionReceipts = (
	data: UseListQuery<CollectionReceipt, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<CollectionReceipt>,
		Error,
		QueryResponse<CollectionReceipt>
	>(
		[
			'useCollectionReceipts',
			params?.page,
			params?.pageSize,
			params?.payorId,
			params?.branchMachineId,
			params?.timeRange,
		],
		() =>
			wrapServiceWithCatch(
				CollectionReceiptsService.list(
					{
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						payor_id: params?.payorId,
						time_range: params?.timeRange || timeRangeTypes.DAILY,
						branch_machine_id: params?.branchMachineId,
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

export const useCollectionReceiptCreate = (
	options?: UseMutationOptions<
		AxiosResponse<CollectionReceipt>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>,
) =>
	useMutation<
		AxiosResponse<CollectionReceipt>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(
		({
			amount,
			bankBranch,
			bankName,
			branchMachineId,
			checkDate,
			checkNumber,
			createdById,
			orderOfPaymentId,
		}) =>
			CollectionReceiptsService.create({
				amount,
				bank_branch: bankBranch,
				bank_name: bankName,
				branch_machine_id: branchMachineId,
				check_date: checkDate,
				check_number: checkNumber,
				created_by_id: createdById,
				order_of_payment_id: orderOfPaymentId,
			}),
		options,
	);

export default useCollectionReceipts;
