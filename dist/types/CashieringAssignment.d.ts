import { BranchMachine } from 'types/BranchMachine';
import { User } from 'types/User';
export interface CashieringAssignment {
    id: number;
    user: User;
    datetime_created: string;
    datetime_start?: string;
    datetime_end?: string;
    datetime_invalidated?: string;
    branch_machine: BranchMachine;
}
