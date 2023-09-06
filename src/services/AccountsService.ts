import axios from 'axios';
import { ServiceType } from '../globals/enums';
import { Account } from '../types';
import { Endpoints, ListQueryParams, ListResponseData } from './interfaces';

interface Params extends ListQueryParams {
	account_code?: string;
	type?: string;
	with_credit_registration?: boolean;
	with_supplier_registration?: boolean;
}

interface Modify {
	biodata_image?: string;
	birthday: string;
	business_address?: string;
	business_name?: string;
	civil_status?: string;
	contact_number: string;
	email_address?: string;
	father_name?: string;
	first_name: string;
	gender: string;
	home_address: string;
	is_point_system_eligible: boolean;
	last_name: string;
	middle_name?: string;
	mother_maiden_name?: string;
	nationality?: string;
	place_of_birth?: string;
	religion?: string;
	tin: string;
	type: string;
}

interface RedeemPoints {
	redeemed_points: number;
	redeem_authorizer_id: number;
	redeem_remarks: string;
}

const service = {
	list: async (
		params: Params,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: '/accounts',
			[ServiceType.OFFLINE]: '/offline-accounts',
		};

		const response = await axios.get<ListResponseData<Account>>(
			endpoints[serviceType],
			{
				baseURL,
				params,
			},
		);

		return response.data;
	},

	retrieve: async (id: number, baseURL?: string) => {
		const response = await axios.get<Account>(`/accounts/${id}/`, {
			baseURL,
		});

		return response.data;
	},

	create: async (body: Modify, baseURL: string) =>
		axios.post('/accounts/', body, { baseURL }),

	edit: async (id: number, body: Modify, baseURL: string) =>
		axios.patch(`/accounts/${id}/`, body, { baseURL }),

	redeemPoints: async (id: number, body: RedeemPoints, baseURL: string) =>
		axios.post(`/accounts/${id}/redeem-points/`, body, { baseURL }),
};

export default service;
