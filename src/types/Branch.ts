import { TaxType } from './SiteSettings';

export interface Branch {
	id: number;
	datetime_created: string;
	name: string;
	server_url?: string;
	online_id?: number;
	location?: string;
	is_online: boolean;
	authorization_status: 'unopened' | 'opened' | 'closed';
	key?: string;
	store_name?: string;
	store_address?: string;
	proprietor?: string;
	contact_number?: string;
	tax_type?: TaxType;
	tin?: string;
	permit_to_use?: string;
}
