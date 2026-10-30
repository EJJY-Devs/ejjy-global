import { Branch, BranchMachine, User } from '../../../types';
import { DailyItemSoldSummary } from '../../../components/modals/ViewDailyItemSoldModal';
export type PrintDailyItemSold = {
    dailyItemSoldSummary: DailyItemSoldSummary[];
    branch: Branch;
    branchMachine?: BranchMachine;
    user?: User;
    isPdf?: boolean;
    reportDate?: string;
};
