import { BranchMachine } from "./BranchMachine";
export interface BranchDay {
    id: number;
    started_by: string;
    ended_by: string;
    branch_machine: BranchMachine;
    datetime_updated: string;
    to_be_uploaded: boolean;
    online_id?: number;
    datetime_created: string;
    is_unauthorized_datetime_ended?: string;
    is_unauthorized: boolean;
    is_automatically_closed: boolean;
    datetime_ended?: string;
}
