import { BranchMachine } from './BranchMachine';
export interface SalesTracker {
    id: number;
    total_sales: string;
    reset_count: number;
    transaction_count: number;
    branch_machine: BranchMachine;
}
