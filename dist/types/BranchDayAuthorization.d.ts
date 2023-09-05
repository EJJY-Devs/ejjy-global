import { Branch } from "./Branch";
import { User } from "./User";
export interface BranchDayAuthorization {
    id: number;
    datetime_created: string;
    datetime_ended?: string;
    started_by: User;
    branch: Branch;
    online_id?: number;
}
