import React from 'react';
import { SiteSettings, User } from '../../../types';
export interface DailyItemSoldSummary {
    id?: number;
    name: string;
    quantity: number;
    datetime_created?: string;
}
type Props = {
    dailyItemSoldSummary: DailyItemSoldSummary[];
    siteSettings: SiteSettings;
    user?: User;
    isForPrint?: boolean;
    onClose: () => void;
};
export declare const ViewDailyItemSoldModal: ({ dailyItemSoldSummary, siteSettings, user, isForPrint, onClose, }: Props) => React.JSX.Element;
export {};
