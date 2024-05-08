import React from 'react';
import { DailySales, SiteSettings, User } from '../../../types';
type Props = {
    dailySales: DailySales;
    siteSettings: SiteSettings;
    user?: User;
    isForPrint?: boolean;
    onClose: () => void;
};
export declare const ViewDailySalesModal: ({ dailySales, siteSettings, user, isForPrint, onClose, }: Props) => React.JSX.Element;
export {};
