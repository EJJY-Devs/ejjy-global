import axios from 'axios';
import { BranchProduct } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

export interface ParamsOffline extends ListQueryParams {
	branch_id?: number;
	identifier?: string;
	is_shown_in_scale_list?: boolean;
	is_sold_in_branch?: boolean;
	search?: string;
	unit_of_measurement?: string;
}
const service = {
	listOffline: async (params: ParamsOffline, baseURL?: string) => {
		const response = await axios.get<ListResponseData<BranchProduct>>(
			'offline-branches-products/offline/',
			{ baseURL, params },
		);

		return response.data;
	},
};

export default service;
