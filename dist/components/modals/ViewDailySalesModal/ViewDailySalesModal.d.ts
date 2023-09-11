import { DailySales, SiteSettings } from 'ejjy-global';
import React from 'react';
interface Props {
    dailySales: DailySales;
    siteSettings: SiteSettings;
    onClose: () => void;
}
export declare const ViewDailySalesModal: ({ dailySales, siteSettings, onClose, }: Props) => React.JSX.Element;
export {};
