import React from 'react';
import { DailySales, SiteSettings, User } from '../../../types';
type Props = {
    dailySales: DailySales;
    siteSettings: SiteSettings;
    user?: User;
    isForPrint?: boolean;
};
export declare const DailySalesContent: ({ dailySales, siteSettings, user, isForPrint, }: Props) => React.JSX.Element;
export {};
