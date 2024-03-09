import axios from 'axios';
import { ServiceType } from '../globals';
import { CreditRegistration } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

const service = {
	list: async (
		params: ListQueryParams,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/credit-registrations/',
			[ServiceType.OFFLINE]: '/offline-credit-registrations/',
		};

		const response = await axios.get<ListResponseData<CreditRegistration>>(
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
