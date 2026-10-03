import React from 'react';
import { CashBreakdown, SiteSettings, User } from '../../../types';
type Props = {
    cashBreakdown: CashBreakdown;
    siteSettings: SiteSettings;
    user?: User;
    layout?: 'columns' | 'stacked';
};
export declare const CashBreakdownContent: ({ cashBreakdown, siteSettings, user, layout, }: Props) => React.JSX.Element;
export {};
