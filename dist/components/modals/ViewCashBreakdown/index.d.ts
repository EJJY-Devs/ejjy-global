import React from 'react';
import { CashBreakdown, SiteSettings, User } from '../../../types';
type Props = {
    cashBreakdown: CashBreakdown;
    siteSettings: SiteSettings;
    user?: User;
    onClose: () => void;
};
export declare const ViewCashBreakdownModal: ({ cashBreakdown, siteSettings, user, onClose, }: Props) => React.JSX.Element;
export {};
