import axios from 'axios';
import { SalesTracker } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	branch_machine_id?: number;
}

export interface Reset {
	branch_machine_id: number;
}

export const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<SalesTracker>>(
			'/sales-tracker/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	reset: async (body: Reset) =>
		axios.post<SalesTracker>('sales-tracker/reset/', body),
};

export default service;
