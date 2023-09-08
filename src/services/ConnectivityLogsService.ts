import axios from 'axios';
import { ConnectivityLogs } from '../types';

interface Create {
	branch_machine_id: number;
	type: string;
}

const service = {
	create: async (body: Create) =>
		axios.post<ConnectivityLogs>('/connectivity-logs/', body),
};

export default service;
