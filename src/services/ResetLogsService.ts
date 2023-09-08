import axios from 'axios';
import { ResetLog } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

const service = {
	list: async (params: ListQueryParams, baseURL?: string) => {
		const response = await axios.get<ListResponseData<ResetLog>>(
			'/reset-logs',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},
};

export default service;
