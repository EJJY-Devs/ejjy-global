import axios from 'axios';
import { DeliveryInvoice } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	branch_machine_id?: number;
	time_range?: string;
}

export interface Create {
	teller_id: number;
	authorizer_id: number;
	creditor_account_id: number;
	branch_machine_id: number;
	products: Array<{
		product_id: number;
		quantity: number;
		price_per_piece: number;
		amount: number;
	}>;
}

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<DeliveryInvoice>>(
			'/delivery-invoices/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	retrieve: async (id: number, baseURL?: string) => {
		const response = await axios.get<DeliveryInvoice>(
			`/delivery-invoices/${id}/`,
			{
				baseURL,
			},
		);

		return response.data;
	},

	create: async (body: Create, baseURL?: string) =>
		axios.post<DeliveryInvoice>('/delivery-invoices/', body, {
			baseURL,
		}),
};

export default service;
