import axios from 'axios';
import { ServiceType } from '../globals';
import { DiscountOption } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

const service = {
	list: async (
		params: ListQueryParams,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/discount-options/',
			[ServiceType.OFFLINE]: '/offline-discount-options/',
		};

		const response = await axios.get<ListResponseData<DiscountOption>>(
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
