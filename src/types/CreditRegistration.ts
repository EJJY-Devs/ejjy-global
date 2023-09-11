import { Account } from './Account';

export interface CreditRegistration {
	id: number;
	credit_limit: string;
	total_balance: string;
	account: Account;
	online_id?: number;
}
