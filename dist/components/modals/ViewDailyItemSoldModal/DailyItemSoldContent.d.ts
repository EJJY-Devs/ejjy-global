import React from 'react';
import { Branch, BranchMachine, User } from '../../../types';
import { DailyItemSoldSummary } from './index';
type Props = {
    dailyItemSoldSummary: DailyItemSoldSummary[];
    branch: Branch;
    branchMachine?: BranchMachine;
    user?: User;
    isForPrint?: boolean;
};
export declare const DailyItemSoldContent: ({ dailyItemSoldSummary, branch, branchMachine, isForPrint, }: Props) => React.JSX.Element;
export {};
