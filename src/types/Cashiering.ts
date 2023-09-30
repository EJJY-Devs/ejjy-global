import { BranchProduct } from './BranchProduct';
import { Product } from './Product';

export type ProductEntryType = 'searched' | 'scanned';

export interface CashieringTransactionProduct extends BranchProduct {
	id: number; // branch_product.product.id
	creditPrice: BranchProduct['credit_price_per_piece'];
	discount_per_piece: number;
	original_quantity: number;
	productEntryType?: ProductEntryType;
	quantity: number;
	regularPrice: BranchProduct['price_per_piece'];
	transactionProductId: number;
	type: Product['unit_of_measurement'];
}
