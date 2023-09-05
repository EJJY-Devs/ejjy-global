import { Branch } from 'types/Branch';
import { BranchMachine } from 'types/BranchMachine';
import { User } from 'types/User';

export interface ActionLog {
	id: number;
	branch: Branch;
	acting_user: User;
	datetime_created: string;
	description: string;
}

export interface UserLog {
	id: number;
	datetime_created: string;
	type:
		| 'login'
		| 'authentication'
		| 'transaction'
		| 'sessions'
		| 'assignments'
		| 'products'
		| 'branch_products'
		| 'cash';
	description: string;
	acting_user: User;
	branch_machine: BranchMachine;
	product_metadata: string;
	branch: Branch;
}
