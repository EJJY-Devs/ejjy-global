import axios from 'axios';
import { ServiceType } from '../globals';
import { BranchMachine } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

interface Params extends ListQueryParams {
	branch_id?: number;
}

interface Ping {
	online_branch_machine_id: number;
}

const service = {
	list: async (
		params: Params,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/branch-machines',
			[ServiceType.OFFLINE]: '/offline-branch-machines',
		};

		const response = await axios.get<ListResponseData<BranchMachine>>(
			endpoints[serviceType],
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	retrieve: async (
		id: number,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: `/branch-machines/${id}/`,
			[ServiceType.OFFLINE]: `/offline-branch-machines/${id}/`,
		};

		const response = await axios.get<BranchMachine>(endpoints[serviceType], {
			baseURL,
		});

		return response.data;
	},

	ping: async (body: Ping) =>
		axios.post('/offline-branch-machines/ping/', body),
};

export default service;
