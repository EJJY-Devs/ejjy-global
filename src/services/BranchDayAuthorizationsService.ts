import axios from 'axios';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';
import { ServiceType } from '../globals';
import { BranchDayAuthorization } from '../types';

export interface Params extends ListQueryParams {
	branch_id?: number;
}

const service = {
	list: async (
		params: Params,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/branches-day-authorizations/',
			[ServiceType.OFFLINE]: '/offline-branches-day-authorizations/',
		};

		const response = await axios.get<ListResponseData<BranchDayAuthorization>>(
			endpoints[serviceType],
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},
};

export default service;
