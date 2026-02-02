import axios from 'axios';
import {
	AttendanceLog,
	AttendanceLogCategory,
	AttendanceLogType,
} from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';

export interface Params extends ListQueryParams {
	attendance_category?: AttendanceLogCategory;
	attendance_type?: AttendanceLogType;
	branch_id?: number;
	employee_id?: number;
}

export interface Create {
	account_code: string;
	attendance_category: AttendanceLogCategory;
	branch_id: number;
	pin: string;
}

const service = {
	list: async (params: Params, baseURL?: string) => {
		const response = await axios.get<ListResponseData<AttendanceLog>>(
			'/attendance-logs/',
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	create: async (body: Create) =>
		axios.post<AttendanceLog>('/attendance-logs/', body),
};

export default service;
