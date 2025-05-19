import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { DeliveryReceiptService } from '../services';
import { Create, Params } from '../services/DeliveryReceiptService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { DeliveryReceipt } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery } from './inteface';

const useDeliveryReceipt = (
	data: UseListQuery<DeliveryReceipt, CamelCasedProperties<Params>> = {},
) => {
	const { params, options } = data;

	return useQuery<
		ListResponseData<DeliveryReceipt>,
		Error,
		QueryResponse<DeliveryReceipt>
	>(
		['useDeliveryReceipt', params],
		() =>
			wrapServiceWithCatch(
				DeliveryReceiptService.list({
					page: params?.page || DEFAULT_PAGE,
					page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
					transaction_id: params?.transactionId,
					type: params?.type,
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

export const useDeliveryReceiptRetrieve = (
	data: UseRetrieveQuery<DeliveryReceipt>,
) => {
	const { id, options, serviceOptions } = data;

	return useQuery<DeliveryReceipt>(
		['useDeliveryReceiptRetrieve', id],
		() =>
			wrapServiceWithCatch(
				DeliveryReceiptService.retrieve(id, serviceOptions?.baseURL),
			),
		{
			enabled: typeof id === 'number',
			...options,
		},
	);
};

export const useDeliveryReceiptCreate = () =>
	useMutation<
		AxiosResponse<DeliveryReceipt>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(({ senderId, encodedById, transactionId, products, type }) =>
		DeliveryReceiptService.create({
			sender_id: senderId,
			encoded_by_id: encodedById,
			transaction_id: transactionId,
			products,
			type,
		}),
	);

export default useDeliveryReceipt;
