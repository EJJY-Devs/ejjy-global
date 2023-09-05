import { Account } from 'types/Account';
import { Transaction } from 'types/Transaction';
import { User } from 'types/User';

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
