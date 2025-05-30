export type VatType = 'VAT' | 'NVAT';

export interface SiteSettings {
	id: number;
	close_day_deadline: string;
	close_session_deadline: string;
	datetime_updated: string;
	to_be_uploaded?: boolean;
	online_id: number;
	store_name?: string;
	address_of_tax_payer?: string;
	proprietor?: string;
	tin?: string;
	permit_number?: string;
	software_developer?: string;
	software_developer_tin?: string;
	software_developer_address?: string;
	pos_accreditation_number?: string;
	pos_accreditation_date?: string;
	pos_accreditation_valid_until_date?: string;
	thank_you_message?: string;
	logo_base64?: string;
	ptu_number?: string;
	ptu_date?: string;
	ptu_valid_until_date?: string;
	contact_number?: string;
	product_version?: string;
	tax_type?: VatType;
	datetime_last_updated_products?: string;
	reporting_period_day_of_month: number;
	reset_counter_notification_threshold_amount: number;
	reset_counter_notification_threshold_invoice_number: number;
	db_backup_location?: string;
	is_markdown_allowed_if_credit?: boolean;
	is_discount_allowed_if_credit?: boolean;
	is_time_checker_feature_enabled?: boolean;
	is_manual_input_allowed?: boolean;
	app_description?: string;
}
