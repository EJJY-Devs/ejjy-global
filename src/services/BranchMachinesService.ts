import axios from 'axios';
import { ServiceType } from '../globals';
import { BranchMachine } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	branch_id?: number;
}

export interface Ping {
	online_branch_machine_id: number;
	online_api_url_override?: string;
}

export type Modify = {
	branch_id: string;
	machine_identification_number: string;
	name: string;
	permit_to_use: string;
	server_url: string;
	type: string;
	storage_serial_number: string;
	ptu_date_issued: string;
};

const service = {
	list: async (
		params: Params,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/branch-machines/',
			[ServiceType.OFFLINE]: '/offline-branch-machines/',
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

	create: async (body: Modify, baseURL?: string) =>
		axios.post<BranchMachine>('/branch-machines/', body, { baseURL }),

	edit: async (id: number, body: Modify, baseURL?: string) =>
		axios.patch<BranchMachine>(`/branch-machines/${id}/`, body, { baseURL }),

	delete: async (id: number, baseURL?: string) =>
		axios.delete(`/branch-machines/${id}/`, { baseURL }),
};

export default service;
