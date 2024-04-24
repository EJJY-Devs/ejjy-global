import React from 'react';
import { CashBreakdown, SiteSettings, User } from '../../../types';
type Props = {
    cashBreakdown: CashBreakdown;
    siteSettings: SiteSettings;
    user?: User;
};
export declare const CashBreakdownContent: ({ cashBreakdown, siteSettings, user, }: Props) => React.JSX.Element;
export {};
