import React from 'react';
import { DailySales, SiteSettings, User } from '../../../types';
interface Props {
    dailySales: DailySales;
    siteSettings: SiteSettings;
    user?: User;
    onClose: () => void;
}
export declare const ViewDailySalesModal: ({ dailySales, siteSettings, user, onClose, }: Props) => React.JSX.Element;
export {};
