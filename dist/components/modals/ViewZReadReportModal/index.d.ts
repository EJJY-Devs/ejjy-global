import React from 'react';
import { SiteSettings, User, ZReadReport } from '../../../types';
interface Props {
    report: ZReadReport;
    siteSettings: SiteSettings;
    user?: User;
    isForPrint?: boolean;
    onClose: () => void;
}
export declare const ViewZReadReportModal: ({ report, siteSettings, user, isForPrint, onClose, }: Props) => React.JSX.Element;
export {};
