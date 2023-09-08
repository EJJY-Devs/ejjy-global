import axios from 'axios';
import { ServiceType } from '../globals';
import { Endpoints } from './interfaces';
import { SiteSettings } from '../types';

const service = {
	get: async (
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: 'site-settings/single/',
			[ServiceType.OFFLINE]: 'offline-site-settings/single/',
		};

		const response = await axios.get<SiteSettings>(endpoints[serviceType], {
			baseURL,
		});

		return response.data;
	},
};

export default service;
