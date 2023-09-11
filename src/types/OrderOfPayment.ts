import { Account } from './Account';
import { Transaction } from './Transaction';
import { User } from './User';

export interface OrderOfPayment {
	id: number;
	datetime_created: string;
	created_by: User;
	payor: Account;
	amount: string;
	purpose: 'partial_payment' | 'full_payment' | 'others';
	extra_description?: string;
	charge_sales_transaction: Transaction;
}
