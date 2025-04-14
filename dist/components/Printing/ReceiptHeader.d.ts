import React from 'react';
import { BranchMachine } from '../../types';
export type ReceiptHeaderProps = {
    branchMachine?: BranchMachine;
    title?: string;
};
export declare const ReceiptHeader: ({ branchMachine, title }: ReceiptHeaderProps) => React.JSX.Element;
