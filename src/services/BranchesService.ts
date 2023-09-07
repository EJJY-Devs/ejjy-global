import axios from 'axios';
import { Branch } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';
import { ServiceType } from '../globals/enums';

interface Modify {
	name: string;
	server_url: string;
}

interface Ping {
	branch_key: string;
}

const service = {
	list: async (
		params: ListQueryParams,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/branches',
			[ServiceType.OFFLINE]: '/offline-branches',
		};

		const response = await axios.get<ListResponseData<Branch>>(
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
			[ServiceType.ONLINE]: `/branches/${id}/`,
			[ServiceType.OFFLINE]: `/offline-branches/${id}/`,
		};

		const response = await axios.get<Branch>(endpoints[serviceType], {
			baseURL,
		});

		return response.data;
	},

	create: async (body: Modify, baseURL: string) =>
		axios.post<Branch>('/branches/', body, { baseURL }),

	edit: async (id: number, body: Modify, baseURL: string) =>
		axios.patch(`/branches/${id}/`, body, { baseURL }),

	ping: async (body: Ping, baseURL: string) =>
		axios.post('/branches/ping/', body, { baseURL }),

	delete: async (id: number, baseURL: string) =>
		axios.delete(`/branches/${id}/`, { baseURL }),
};

export default service;
