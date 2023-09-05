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
}
