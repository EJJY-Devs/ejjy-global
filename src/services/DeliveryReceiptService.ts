import axios from 'axios';
import { DeliveryReceipt } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	transaction_id?: number;
	type?: string;
}

type CreateProduct = {
	product_id: number;
	quantity_returned: number;
};

export interface Create {
	sender_id: number;
	encoded_by_id: number;
	transaction_id: number;
	products: CreateProduct[];
	type: string;
}

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<DeliveryReceipt>>(
			'/back-orders/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	retrieve: async (id: number, baseURL?: string) => {
		const response = await axios.get<DeliveryReceipt>(`/back-orders/${id}/`, {
			baseURL,
		});

		return response.data;
	},

	create: async (body: Create) =>
		axios.post<DeliveryReceipt>('/back-orders/', body),
};

export default service;
