import axios from 'axios';
import { CashieringSession } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

interface Start {
	login: string;
	password: string;
	branch_machine_id: number;
	branch_machine_registration_count: number;
}

interface End {
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

	retrieve: async (id: number) => {
		const response = await axios.get<CashieringSession>(
			`/cashiering-sessions/${id}/`,
		);

		return response.data;
	},

	start: async (body: Start) =>
		axios.post<CashieringSession>('/cashiering-sessions/start/', body),

	end: async (id: number, body: End) =>
		axios.post<CashieringSession>(`/cashiering-sessions/${id}/end/`, body),

	validate: async (id: number) =>
		axios.post<boolean>(`/cashiering-sessions/${id}/validate/`),
};

export default service;
