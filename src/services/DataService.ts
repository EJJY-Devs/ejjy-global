import axios from 'axios';
import { ListQueryParams } from './interfaces';

export interface Params extends ListQueryParams {
	branch_id?: number;
	branch_machine_id?: number;
}

export interface Upload {
	is_back_office: boolean;
}

const service = {
	initialize: async (params: Params, baseURL?: string) => {
		const response = await axios.get<void>('/bulk-initialize/', {
			baseURL,
			params,
		});

		return response.data;
	},

	upload: async (body: Upload, baseURL?: string) =>
		axios.post<boolean>('/offline-upload-data/', body, { baseURL }),
};

export default service;
