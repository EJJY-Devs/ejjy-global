import React from 'react';
import { Branch, BranchMachine } from '../../types';
export type ReceiptHeaderProps = {
    branchMachine?: BranchMachine;
    title?: string;
    branchHeader?: Branch;
};
export declare const ReceiptHeader: ({ branchMachine, title, branchHeader, }: ReceiptHeaderProps) => React.JSX.Element;
