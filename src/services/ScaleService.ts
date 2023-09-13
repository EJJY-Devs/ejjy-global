import axios from 'axios';

const service = {
	getWeight: async (baseURL: string) => {
		const response = await axios.get<number>('/weight', { baseURL });

		return response.data;
	},
};

export default service;
