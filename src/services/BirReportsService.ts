import axios from 'axios';
import { ListQueryParams, ListResponseData } from './interfaces';
import { BirReport } from '../types';

export interface Params extends ListQueryParams {
	branch_machine_id?: number;
}

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<BirReport>>(
			'/bir-reports/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},
};

export default service;
