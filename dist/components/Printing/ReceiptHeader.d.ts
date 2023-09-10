import React from 'react';
import { BranchMachine, SiteSettings } from '../../types';
interface Props {
    branchMachine: BranchMachine;
    siteSettings: SiteSettings;
    title?: string;
}
export declare const ReceiptHeader: ({ branchMachine, siteSettings, title, }: Props) => React.JSX.Element;
export {};
