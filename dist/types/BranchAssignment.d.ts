import { Branch } from 'types/Branch';
import { User } from 'types/User';
export interface BranchAssignment {
    id: number;
    datetime_created: string;
    user: User;
    branch: Branch;
}
