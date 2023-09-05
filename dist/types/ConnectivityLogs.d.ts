import { Branch } from 'types/Branch';
import { BranchMachine } from 'types/BranchMachine';
export interface ConnectivityLogs {
    id: number;
    datetime_created: string;
    type: 'online_to_offline' | 'offline_to_online';
    branch: Branch;
    branch_machine: BranchMachine;
}
