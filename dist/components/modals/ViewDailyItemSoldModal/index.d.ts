import React from 'react';
import { Branch, BranchMachine, User } from '../../../types';
export interface DailyItemSoldSummary {
    id?: number;
    name: string;
    quantity: number;
    datetime_created?: string;
}
type Props = {
    dailyItemSoldSummary: DailyItemSoldSummary[];
    branch: Branch;
    branchMachine?: BranchMachine;
    user?: User;
    isForPrint?: boolean;
    loading?: boolean;
    reportDate?: string;
    onClose: () => void;
};
export declare const ViewDailyItemSoldModal: ({ dailyItemSoldSummary, branch, branchMachine, user, loading, reportDate, onClose, }: Props) => React.JSX.Element;
export {};
