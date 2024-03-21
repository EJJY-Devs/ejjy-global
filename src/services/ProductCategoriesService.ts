import axios from 'axios';
import { ServiceType } from '../globals/enums';
import { ProductCategory } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

export interface Modify {
	name: string;
	priority_level: number;
}

const service = {
	list: async (
		params: ListQueryParams,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/product-categories/',
			[ServiceType.OFFLINE]: '/offline-product-categories/',
		};

		const response = await axios.get<ListResponseData<ProductCategory>>(
			endpoints[serviceType],
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	create: async (body: Modify, baseURL?: string) =>
		axios.post<ProductCategory>('/product-categories/', body, { baseURL }),

	edit: async (id: number, body: Modify, baseURL?: string) =>
		axios.patch(`/product-categories/${id}/`, body, { baseURL }),

	delete: async (id: number, baseURL?: string) =>
		axios.delete(`/product-categories/${id}/`, { baseURL }),
};

export default service;
