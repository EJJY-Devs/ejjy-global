import axios from 'axios';
import { ListQueryParams, ListResponseData } from './interfaces';
import { DailySales } from '../types';

export interface Params extends ListQueryParams {
	is_with_daily_sales_data?: boolean;
}

export interface Create {
	generated_by_id: number;
	cashiering_session_ids: string;
}

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<DailySales>>(
			'/xread-reports/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	create: async (body: Create) =>
		axios.post<DailySales>('/xread-reports/create-daily-sales/', body),
};

export default service;
