import React from 'react';
import { CashInDrawerSummary } from '../../../print/receipt/printCashBreakdown/types';
import { CashBreakdown, SiteSettings, User } from '../../../types';
type Props = {
    cashBreakdown: CashBreakdown;
    siteSettings: SiteSettings;
    user?: User;
    layout?: 'columns' | 'stacked';
    cashInDrawerSummary?: CashInDrawerSummary;
};
export declare const CashBreakdownContent: ({ cashBreakdown, siteSettings, user, layout, cashInDrawerSummary, }: Props) => React.JSX.Element;
export {};
