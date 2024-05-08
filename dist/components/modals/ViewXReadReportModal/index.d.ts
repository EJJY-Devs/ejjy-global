import React from 'react';
import { SiteSettings, User, XReadReport } from '../../../types';
type Props = {
    report: XReadReport;
    siteSettings: SiteSettings;
    user?: User;
    isForPrint?: boolean;
    onClose: () => void;
};
export declare const ViewXReadReportModal: ({ report, siteSettings, user, isForPrint, onClose, }: Props) => React.JSX.Element;
export {};
