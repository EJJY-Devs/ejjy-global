import axios from 'axios';
import { CollectionReceipt } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	is_pending?: boolean;
	payor_id?: number;
	branch_machine_id?: number;
}

export interface Create {
	amount: string;
	bank_branch?: string;
	bank_name?: string;
	branch_machine_id: number;
	check_date?: string;
	check_number?: string;
	created_by_id: number;
	order_of_payment_id: number;
	mode: string;
}

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<CollectionReceipt>>(
			'/collection-receipts/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	create: async (body: Create) =>
		axios.post<CollectionReceipt>('/collection-receipts/', body),
};

export default service;
