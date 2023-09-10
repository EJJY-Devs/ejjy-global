import axios from 'axios';
import { ServiceType } from '../globals';
import { Endpoints, ListQueryParams } from './interfaces';
import { SiteSettings } from '../types';

export interface Params extends ListQueryParams {
	branch_id?: number;
}

const service = {
	retrieve: async (
		params?: Params,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: 'site-settings/single/',
			[ServiceType.OFFLINE]: 'offline-site-settings/single/',
		};

		const response = await axios.get<SiteSettings>(endpoints[serviceType], {
			params,
			baseURL,
		});

		return response.data;
	},
};

export default service;
