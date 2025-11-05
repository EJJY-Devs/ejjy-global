import { SiteSettings, User, Branch, BranchProduct } from '../../../types';

// Inferred from the ViewAdjustmentSlipModal component
export interface AdjustmentSlipProduct {
	id: number;
	branch_product: BranchProduct;
	adjusted_value: number;
	remarks?: string;
	error_remarks?: string;
}

export interface AdjustmentSlip {
	id: number;
	reference_number: string;
	datetime_created: string;
	branch: Branch;
	encoded_by: User;
	products: AdjustmentSlipProduct[];
	remarks?: string;
}

export type PrintAdjustmentSlip = {
	adjustmentSlip: AdjustmentSlip;
	siteSettings: SiteSettings;
	user?: User;
	isPdf?: boolean;
};