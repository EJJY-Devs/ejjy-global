import axios from 'axios';
import { UserLog } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	acting_user_id?: number;
	type?: string;
}

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<UserLog>>('/user-logs', {
			baseURL,
			params,
		});

		return response.data;
	},
};

export default service;
