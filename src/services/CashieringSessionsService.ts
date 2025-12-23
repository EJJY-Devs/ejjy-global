import axios from 'axios';
import { CashieringSession } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

export interface Start {
	login: string;
	password: string;
	pin: string;
	branch_machine_id: number;
	branch_machine_registration_count: number;
}

export interface End {
	id: number;
	branch_machine_id: number;
	is_automatically_closed: boolean;
}

const service = {
	list: async (params: ListQueryParams, baseURL?: string) => {
		const response = await axios.get<ListResponseData<CashieringSession>>(
			'/cashiering-sessions/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	retrieve: async (id: number, baseURL?: string) => {
		const response = await axios.get<CashieringSession>(
			`/cashiering-sessions/${id}/`,
			{
				baseURL,
			},
		);

		return response.data;
	},

	start: async (body: Start) =>
		axios.post<CashieringSession>('/cashiering-sessions/start/', body),

	end: async (body: End) =>
		axios.post<CashieringSession>(`/cashiering-sessions/${body.id}/end/`, body),

	validate: async (id: number) =>
		axios.post<boolean>(`/cashiering-sessions/${id}/validate/`),
};

export default service;
