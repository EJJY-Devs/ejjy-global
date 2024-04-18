import React from 'react';
import { DailySales, SiteSettings, User } from '../../../types';
interface Props {
    dailySales: DailySales;
    siteSettings: SiteSettings;
    user?: User;
}
export declare const DailySalesContent: ({ dailySales, siteSettings, user, }: Props) => React.JSX.Element;
export {};
