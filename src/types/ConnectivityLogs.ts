import { Branch } from "./Branch";
import { BranchMachine } from "./BranchMachine";

export interface ConnectivityLogs {
  id: number;
  datetime_created: string;
  type: "online_to_offline" | "offline_to_online";
  branch: Branch;
  branch_machine: BranchMachine;
}
