import axios from 'axios';
import { ServiceType } from '../globals';
import { OrderOfPayment } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	is_pending?: boolean;
}

const service = {
	list: async (
		params: Params,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/order-of-payments',
			[ServiceType.OFFLINE]: '/offline-order-of-payments',
		};

		const response = await axios.get<ListResponseData<OrderOfPayment>>(
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
