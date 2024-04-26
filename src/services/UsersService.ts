import axios from 'axios';
import { ServiceType } from '../globals';
import { User } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

export interface AuthenticateAnAction {
	login: string;
	password: string;
	description?: string;
}

const service = {
	list: async (
		params: ListQueryParams,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/users/',
			[ServiceType.OFFLINE]: '/offline-users/',
		};

		const response = await axios.get<ListResponseData<User>>(
			endpoints[serviceType],
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	authenticateAnAction: async (body: AuthenticateAnAction, baseURL?: string) =>
		axios.post<User>('users/authenticate/', body, { baseURL }),
};

export default service;
