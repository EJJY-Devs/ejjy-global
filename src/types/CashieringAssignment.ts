import { BranchMachine } from './BranchMachine';
import { User } from './User';

export interface CashieringAssignment {
	id: number;
	user: User;
	datetime_created: string;
	datetime_start?: string;
	datetime_end?: string;
	datetime_invalidated?: string;
	branch_machine: BranchMachine;
}
