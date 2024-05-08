import React from 'react';
import { BranchMachine, SiteSettings } from '../../types';
type Props = {
    branchMachine?: BranchMachine;
    siteSettings: SiteSettings;
    title?: string;
};
export declare const ReceiptHeader: ({ branchMachine, siteSettings, title, }: Props) => React.JSX.Element;
export {};
