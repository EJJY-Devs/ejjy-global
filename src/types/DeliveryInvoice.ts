import { Product } from './Product';
import { User } from './User';
import { BranchMachine } from './BranchMachine';
import { Account } from './Account';

export interface DeliveryInvoiceProduct {
	id: number;
	product_id: number;
	quantity: number;
	price_per_piece: number;
	amount: number;
	product: Product;
}

export interface DeliveryInvoice {
	id: number;
	teller_id: number;
	authorizer_id: number;
	creditor_account_id: number;
	branch_machine_id: number;
	teller: User;
	authorizer: User;
	creditor_account: Account;
	branch_machine: BranchMachine;
	products: DeliveryInvoiceProduct[];
	created_at: string;
	updated_at?: string;
}
