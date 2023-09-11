import React from 'react';
import { DailySales, SiteSettings } from '../../../types';
interface Props {
    dailySales: DailySales;
    siteSettings: SiteSettings;
    onClose: () => void;
}
export declare const ViewDailySalesModal: ({ dailySales, siteSettings, onClose, }: Props) => React.JSX.Element;
export {};
