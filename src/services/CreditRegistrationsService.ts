import axios from 'axios';

import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';
import { ServiceType } from '../globals';
import { CreditRegistration } from '../types';

const service = {
	list: async (
		params: ListQueryParams,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/credit-registrations',
			[ServiceType.OFFLINE]: '/offline-credit-registrations',
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
