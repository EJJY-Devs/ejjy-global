import { VatType } from './SiteSettings';

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
	vat_type?: VatType;
	tin?: string;
}
