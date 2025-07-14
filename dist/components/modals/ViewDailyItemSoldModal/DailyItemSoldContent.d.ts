import React from 'react';
import { SiteSettings, User } from '../../../types';
import { DailyItemSoldSummary } from './index';
type Props = {
    dailyItemSoldSummary: DailyItemSoldSummary[];
    siteSettings: SiteSettings;
    user?: User;
    isForPrint?: boolean;
};
export declare const DailyItemSoldContent: ({ dailyItemSoldSummary, siteSettings, isForPrint, }: Props) => React.JSX.Element;
export {};
