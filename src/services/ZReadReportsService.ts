import axios from 'axios';
import { ListQueryParams, ListResponseData } from './interfaces';
import { ZReadReport } from '../types';

export interface Params extends ListQueryParams {
	branch_machine_id?: number;
	branch_machine_name?: string;
}

export interface Create {
	branch_machine_id: number;
	date: string;
	user_id: number;
}

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<ZReadReport>>(
			'/zread-reports/',
			{ params, baseURL },
		);

		return response.data;
	},

	create: async (body: Create) =>
		axios.post<ZReadReport>('/zread-reports/', body),
};

export default service;
