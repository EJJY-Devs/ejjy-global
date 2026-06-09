import React from 'react';
import { BranchMachine, SiteSettings, User } from '../../../types';
export declare const birReportStyles: React.DetailedReactHTMLElement<{}, HTMLElement>;
type BirHeaderProps = {
    branchMachine?: BranchMachine;
    siteSettings: SiteSettings;
    title: string;
    user: User;
};
export declare const BirHeader: ({ branchMachine, siteSettings, title, user, }: BirHeaderProps) => React.JSX.Element;
export {};
