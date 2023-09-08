import { Branch } from './Branch';
import { BranchMachine } from './BranchMachine';
import { User } from './User';
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
    type: 'login' | 'authentication' | 'transaction' | 'sessions' | 'assignments' | 'products' | 'branch_products' | 'cash';
    description: string;
    acting_user: User;
    branch_machine: BranchMachine;
    product_metadata: string;
    branch: Branch;
}
export interface ResetLog {
    id: number;
    datetime_created: string;
    latest_sales_before_reset: string;
    reset_count: number;
}
