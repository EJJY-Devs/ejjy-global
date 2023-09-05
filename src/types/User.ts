import { BranchAssignment } from "types/BranchAssignment";

export type UserType =
  | "admin"
  | "office_manager"
  | "branch_manager"
  | "branch_personnel";

export interface User {
  id: number;
  last_login?: string;
  login_count: number;
  active_sessions_count: number;
  email?: string;
  username: string;
  user_type?: UserType;
  first_name?: string;
  last_name?: string;
  profile_pic?: string;
  display_name?: string;
  contact_number?: string;
  branch_assignment: BranchAssignment;
  online_id?: number;
  employee_id: string;
  pending_approval: string;
}

export interface UserPendingApproval {
  id: number;
  user: User;
  deleted: string;
  datetime_created: string;
  approval_type: "create" | "update_user_type" | "delete";
  new_user_type?: UserType;
}
