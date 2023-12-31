export interface Account {
	id: number;
	datetime_created: string;
	first_name?: string;
	middle_name?: string;
	last_name?: string;
	business_name?: string;
	birthday?: string;
	tin?: string;
	business_address?: string;
	home_address?: string;
	contact_number?: string;
	gender: 'm' | 'f';
	type: 'regular' | 'employee' | 'government' | 'corporate';
	is_point_system_eligible: boolean;
	total_points_balance: number;
	total_points_redeemed: number;
	total_points_earned: number;
	online_id: number;
	account_code: number;
	civil_status: 'single' | 'married' | 'widowed' | 'divorced' | 'separated';
	nationality?: string;
	place_of_birth?: string;
	father_name?: string;
	mother_maiden_name?: string;
	religion?: string;
	email_address?: string;
	biodata_image?: string;
	age: number;
}
