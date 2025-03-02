import { Branch } from './Branch';
import { Product } from './Product';
import { User } from './User';

type RequisitionSlipType = 'manual' | 'automatic';

type RequisitionSlipAction = {
	datetime_created: string;
	action:
		| 'new'
		| 'seen'
		| 'f_os1_creating'
		| 'f_os1_created'
		| 'f_os1_preparing'
		| 'f_os1_prepared'
		| 'f_ds1_creating'
		| 'f_ds1_created'
		| 'f_ds1_delivering'
		| 'f_ds1_delivered_done'
		| 'f_ds1_delivered_error'
		| 'out_of_stock';
};

type RequisitionSlipProduct = {
	id: number;
	product_id: number;
	product: Product;
	is_out_of_stock: boolean;
	quantity: number;
	status: 'added_to_os' | 'not_added_to_os';
};

type RequisitionSlipProgress = {
	current: number;
	total: number;
};

type RequisitionSlipRequestingUser = {
	branch: Branch;
} & Pick<
	User,
	| 'email'
	| 'username'
	| 'user_type'
	| 'first_name'
	| 'last_name'
	| 'profile_pic'
	| 'display_name'
	| 'contact_number'
>;

export type RequisitionSlip = {
	id: number;
	datetime_created: string;
	prepared_by: RequisitionSlipRequestingUser;
	approved_by: RequisitionSlipRequestingUser;
	type: RequisitionSlipType;
	action: RequisitionSlipAction;
	products: RequisitionSlipProduct[];
	progress: RequisitionSlipProgress;
	reference_number: string;
	branch: Branch;
};
