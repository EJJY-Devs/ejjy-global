import axios from 'axios';
import { ServiceType } from '../globals';
import { User } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	branch_id?: number;
	is_pending_create_approval?: boolean;
	is_pending_update_user_type_approval?: boolean;
	is_pending_delete_approval?: boolean;
}

export interface AuthenticateAnAction {
	login: string;
	password: string;
	description?: string;
}

export interface Modify {
	branch_id?: number;
	contact_number?: string;
	display_name?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	password?: string;
	user_type?: string;
	username?: string;
}
export interface RequestUserTypeChange {
	new_user_type: string;
}

export interface DeclineUserPendingApproval {
	pending_approval_type: string;
}

const service = {
	list: async (
		params: Params,
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

	retrieve: async (id: number, baseURL?: string) => {
		const response = await axios.get<User>(`/users/${id}/`, { baseURL });

		return response.data;
	},

	authenticateAnAction: async (body: AuthenticateAnAction, baseURL?: string) =>
		axios.post<User>('users/authenticate/', body, { baseURL }),

	create: async (body: Modify, baseURL?: string) =>
		axios.post<User>('/users/', body, { baseURL }),

	edit: async (id: number, body: Modify, baseURL?: string) =>
		axios.patch<User>(`/users/${id}/`, body, { baseURL }),

	delete: async (id: number, baseURL?: string) =>
		axios.delete(`/users/${id}/`, { baseURL }),
};

export default service;
