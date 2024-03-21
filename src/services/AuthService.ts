import axios from 'axios';
import { NO_VERIFICATION_CONFIG } from '../globals';

export interface Login {
	login: string;
	password: string;
}

export interface AcquireToken {
	username: string;
	password: string;
}

const service = {
	login: async (body: Login, baseURL?: string) =>
		axios.post('users/login/', body, { baseURL, ...NO_VERIFICATION_CONFIG }),

	retrieve: async (id: number, baseURL?: string) =>
		axios.get(`users/${id}/`, { baseURL }),

	acquireToken: async (body: AcquireToken, baseURL?: string) =>
		axios.post('tokens/acquire/', body, { baseURL, ...NO_VERIFICATION_CONFIG }),

	logout: async (id: number, baseURL?: string) =>
		axios.post(`users/${id}/logout/`, null, { baseURL }),
};

export default service;
