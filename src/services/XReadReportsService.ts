import axios from 'axios';
import { ListQueryParams, ListResponseData } from './interfaces';
import { XReadReport } from '../types';

export interface Params extends ListQueryParams {
	branch_machine_id?: number;
	is_with_daily_sales_data?: boolean;
}

export interface Create {
	branch_machine_id: number;
	date: string;
	user_id: number;
}

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<XReadReport>>(
			'/xread-reports/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	create: async (body: Create) =>
		axios.post<XReadReport>('/xread-reports/', body),
};

export default service;
