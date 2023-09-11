import { Branch } from './Branch';
import { User } from './User';

export interface BranchAssignment {
	id: number;
	datetime_created: string;
	user: User;
	branch: Branch;
}
