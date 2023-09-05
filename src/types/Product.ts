import { PointSystemTag } from './PointSystemTag';

export interface Product {
	id: number;
	datetime_created: string;
	barcode?: string;
	selling_barcode?: string;
	packing_barcode?: string;
	textcode?: string;
	name: string;
	type: 'wet' | 'dry';
	unit_of_measurement: 'weighing' | 'non_weighing';
	selling_barcode_unit_of_measurement: 'weighing' | 'non_weighing';
	packing_barcode_unit_of_measurement: 'weighing' | 'non_weighing';
	is_vat_exempted: boolean;
	print_details?: string;
	description?: string;
	allowable_spoilage: string;
	cost_per_piece: string;
	cost_per_bulk: string;
	pieces_in_bulk: string;
	reorder_point: string;
	max_balance: string;
	price_per_piece: string;
	price_per_bulk: string;
	product_category?: string;
	is_shown_in_scale_list: boolean;
	point_system_tag: PointSystemTag;
	conversion_amount: string;
	online_id?: number;
	has_quantity_allowance: boolean;
	key?: string;
	price_tag_print_details?: string;
}
