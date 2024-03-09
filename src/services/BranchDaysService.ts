import axios from 'axios';
import { BranchDay } from '../types';

export interface Create {
	branch_machine_id: number;
	started_by_id: number;
}

export interface Edit {
	id: number;
	branch_machine_id: number;
	ended_by_id: number | null;
	is_automatically_closed?: boolean;
}

const service = {
	retrieveToday: async (baseURL?: string) => {
		const response = await axios.get<BranchDay>('branches-days/latest-today/', {
			baseURL,
		});

		return response.data;
	},

	create: async (body: Create) =>
		axios.post<BranchDay>('/branches-days/', body),

	edit: async (body: Edit) =>
		axios.patch<BranchDay>(`/branches-days/${body.id}/`, body),
};

export default service;
