import axios from 'axios';

export interface Connect {
	comPort: number;
}

const service = {
	connect: async (body: Connect, baseURL: string) =>
		axios.post<boolean>('/connect/', body, { baseURL }),

	getWeight: async (baseURL: string) => {
		const response = await axios.get<number>('/weight', { baseURL });

		return response.data;
	},
};

export default service;
