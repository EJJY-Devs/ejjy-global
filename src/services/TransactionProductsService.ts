import axios from 'axios';
import { ServiceType } from '../globals';
import { TransactionProduct } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

interface List extends ListQueryParams {
	is_vat_exempted?: boolean;
	or_number?: boolean;
	statuses?: string;
	time_range?: string;
	branch_id?: number | string;
}

const service = {
	list: async (
		params: List,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: 'transaction-products/',
			[ServiceType.OFFLINE]: 'offline-transaction-products/offline/',
		};

		const response = await axios.get<ListResponseData<TransactionProduct>>(
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
