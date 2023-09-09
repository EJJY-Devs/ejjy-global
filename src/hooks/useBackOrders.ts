import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../globals';
import { BackOrdersService } from '../services';
import { Create, Params } from '../services/BackOrdersService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { BackOrder } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery } from './inteface';

const useBackOrders = (
	data: UseListQuery<BackOrder, CamelCasedProperties<Params>> = {},
) => {
	const { params, options } = data;

	return useQuery<ListResponseData<BackOrder>, Error, QueryResponse<BackOrder>>(
		['useBackOrders', params],
		() =>
			wrapServiceWithCatch(
				BackOrdersService.list({
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

export const useBackOrderRetrieve = (data: UseRetrieveQuery<BackOrder>) => {
	const { id, options, serviceOptions } = data;

	return useQuery<BackOrder>(
		['useBackOrderRetrieve', id],
		() =>
			wrapServiceWithCatch(
				BackOrdersService.retrieve(id, serviceOptions?.baseURL),
			),
		{
			enabled: typeof id === 'number',
			...options,
		},
	);
};

export const useBackOrdersCreate = () =>
	useMutation<
		AxiosResponse<BackOrder>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(({ senderId, encodedById, transactionId, products, type }) =>
		BackOrdersService.create({
			sender_id: senderId,
			encoded_by_id: encodedById,
			transaction_id: transactionId,
			products,
			type,
		}),
	);

export default useBackOrders;
