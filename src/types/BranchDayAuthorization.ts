import { Branch } from 'types/Branch';
import { User } from 'types/User';

export interface BranchDayAuthorization {
	id: number;
	datetime_created: string;
	datetime_ended?: string;
	started_by: User;
	branch: Branch;
	online_id?: number;
}
