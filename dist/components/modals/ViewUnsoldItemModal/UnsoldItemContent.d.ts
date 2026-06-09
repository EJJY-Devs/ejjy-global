import React from 'react';
import { Branch, BranchMachine, User } from '../../../types';
import { UnsoldItemSummary } from './index';
type Props = {
    unsoldItemSummary: UnsoldItemSummary[];
    branch: Branch;
    branchMachine?: BranchMachine;
    user?: User;
    reportDate?: string;
};
export declare const UnsoldItemContent: ({ unsoldItemSummary, branch, branchMachine, reportDate, }: Props) => React.JSX.Element;
export {};
