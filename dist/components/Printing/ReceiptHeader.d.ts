import React from 'react';
import { BranchMachine, SiteSettings } from '../../types';
export type ReceiptHeaderProps = {
    branchMachine?: BranchMachine;
    siteSettings: SiteSettings;
    title?: string;
};
export declare const ReceiptHeader: ({ branchMachine, siteSettings, title, }: ReceiptHeaderProps) => React.JSX.Element;
