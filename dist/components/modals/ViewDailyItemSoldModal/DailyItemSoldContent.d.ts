import React from 'react';
import { Branch, BranchMachine, User } from '../../../types';
import { DailyItemSoldSummary } from './index';
type Props = {
    dailyItemSoldSummary: DailyItemSoldSummary[];
    branch: Branch;
    branchMachine?: BranchMachine;
    user?: User;
    reportDate?: string;
};
export declare const DailyItemSoldContent: ({ dailyItemSoldSummary, branch, branchMachine, reportDate, }: Props) => React.JSX.Element;
export {};
