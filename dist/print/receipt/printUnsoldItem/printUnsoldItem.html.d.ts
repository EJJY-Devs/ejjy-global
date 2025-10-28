import React from 'react';
import { Branch, BranchMachine, User } from '../../../types';
import { PrintUnsoldItem, UnsoldItemSummary } from './types';
export declare const UnsoldItemContent: ({ unsoldItemSummary, branch, branchMachine, reportDate, }: {
    unsoldItemSummary: UnsoldItemSummary[];
    branch: Branch;
    branchMachine?: BranchMachine | undefined;
    user?: User | undefined;
    reportDate?: string | undefined;
}) => React.JSX.Element;
export declare const printUnsoldItemHtml: ({ unsoldItemSummary, branch, branchMachine, user, isPdf, reportDate, }: PrintUnsoldItem) => string | undefined;
