import axios from 'axios';
import { ServiceType } from '../globals';
import { Endpoints, ListQueryParams } from './interfaces';
import { SiteSettings } from '../types';

export interface Params extends ListQueryParams {
	branch_id?: number;
}

export type Edit = {
	address_of_tax_payer: string;
	app_description: string;
	close_day_deadline: string;
	close_session_deadline: string;
	contact_number: string;
	is_discount_allowed_if_credit: boolean;
	is_manual_input_allowed: boolean;
	is_markdown_allowed_if_credit: boolean;
	is_time_checker_feature_enabled: boolean;
	logo_base64: string;
	pos_accreditation_date: string;
	pos_accreditation_number: string;
	pos_accreditation_valid_until_date: string;
	product_version: string;
	proprietor: string;
	ptu_date: string;
	ptu_number: string;
	ptu_valid_until_date: string;
	reporting_period_day_of_month: string;
	reset_counter_notification_threshold_amount: number;
	reset_counter_notification_threshold_invoice_number: number;
	software_developer_address: string;
	software_developer_tin: string;
	software_developer: string;
	store_name: string;
	tax_type: string;
	thank_you_message: string;
	tin: string;
};

const service = {
	retrieve: async (
		params?: Params,
		baseURL?: string,
		serviceType: ServiceType = ServiceType.ONLINE,
	) => {
		const endpoints: Endpoints = {
			[ServiceType.ONLINE]: 'site-settings/single/',
			[ServiceType.OFFLINE]: 'offline-site-settings/single/',
		};

		const response = await axios.get<SiteSettings>(endpoints[serviceType], {
			params,
			baseURL,
		});

		return response.data;
	},

	edit: async (id: number, body: Edit, baseURL?: string) =>
		axios.patch(`/site-settings/${id}/`, body, { baseURL }),
};

export default service;
