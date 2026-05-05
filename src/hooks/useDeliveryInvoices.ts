import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, timeRangeTypes } from '../globals';
import { DeliveryInvoiceService } from '../services';
import { Create, Params } from '../services/DeliveryInvoiceService';
import {
	AxiosErrorResponse,
	ListResponseData,
	QueryResponse,
} from '../services/interfaces';
import { DeliveryInvoice } from '../types';
import { wrapServiceWithCatch } from './helper';
import { UseListQuery, UseRetrieveQuery, Mutate } from './inteface';

const useDeliveryInvoices = (
	data: UseListQuery<DeliveryInvoice, CamelCasedProperties<Params>> = {},
) => {
	const { params, options, serviceOptions } = data;

	return useQuery<
		ListResponseData<DeliveryInvoice>,
		Error,
		QueryResponse<DeliveryInvoice>
	>(
		[
			'useDeliveryInvoices',
			params?.page,
			params?.pageSize,
			params?.branchMachineId,
			params?.timeRange,
		],
		() =>
			wrapServiceWithCatch(
				DeliveryInvoiceService.list(
					{
						page: params?.page || DEFAULT_PAGE,
						page_size: params?.pageSize || DEFAULT_PAGE_SIZE,
						branch_machine_id: params?.branchMachineId,
						time_range: params?.timeRange || timeRangeTypes.DAILY,
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

interface UseDeliveryInvoiceRetrieveQuery<T>
	extends Omit<UseRetrieveQuery<T>, 'id'> {
	id: number | string;
}

export const useDeliveryInvoiceRetrieve = (
	data: UseDeliveryInvoiceRetrieveQuery<DeliveryInvoice>,
) => {
	const { id, options, serviceOptions } = data;

	const idType = typeof id;

	return useQuery<DeliveryInvoice>(
		['useDeliveryInvoiceRetrieve', id],
		() =>
			DeliveryInvoiceService.retrieve(id as number, serviceOptions?.baseURL),
		{
			enabled: idType === 'number' || idType === 'string',
			...options,
		},
	);
};

export const useDeliveryInvoiceCreate = (data?: Mutate) =>
	useMutation<
		AxiosResponse<DeliveryInvoice>,
		AxiosErrorResponse,
		CamelCasedProperties<Create>
	>(
		(body) => DeliveryInvoiceService.create(body as unknown as Create),
		data?.options,
	);

export default useDeliveryInvoices;
