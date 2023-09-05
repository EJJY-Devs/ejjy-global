import { BranchMachine } from "./BranchMachine";
import { User } from "./User";
export interface CashieringSession {
    id: number;
    user: User;
    date: string;
    branch_machine: BranchMachine;
    is_unauthorized: boolean;
    datetime_started: string;
    datetime_ended?: string;
    is_unauthorized_datetime_ended?: string;
    is_automatically_closed: boolean;
}
