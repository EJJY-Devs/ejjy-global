import { PriceMarkdown } from './PriceMarkdown';
import { Product } from './Product';
import { RequisitionSlip } from './RequisitionSlip';
import { User } from './User';

export interface BranchProduct {
	id: number;
	product: Product;
	reorder_point: number;
	assigned_personnel: User;
	max_balance: number;
	price_per_piece: number;
	price_per_bulk: number;
	credit_price_per_piece: number;
	credit_price_per_bulk: number;
	government_credit_price_per_piece: number;
	government_credit_price_per_bulk: number;
	cost_per_piece: number;
	cost_per_bulk: number;
	current_balance: number;
	bo_balance: string;
	balance_last_updated?: string;
	allowable_spoilage: string;
	product_status: 'available' | 'reorder' | 'out_of_stock';
	is_daily_checked: boolean;
	is_randomly_checked: boolean;
	markdown_price_per_piece1: number;
	markdown_price_per_bulk1: number;
	markdown_price_per_piece2: number;
	markdown_price_per_bulk2: number;
	is_shown_in_scale_list: boolean;
	is_sold_in_branch: boolean;
	daily_average_sold: string;
	daily_average_sold_percentage: string;
	latest_requisition_slip: RequisitionSlip;
	price_markdown: PriceMarkdown;
	branch_id: number;
}
