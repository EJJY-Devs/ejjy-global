import React from 'react';
import { SiteSettings, User, ZReadReport } from '../../../types';
interface Props {
    report: ZReadReport;
    siteSettings: SiteSettings;
    user: User;
    onClose: () => void;
}
export declare const ViewZReadReportModal: ({ report, siteSettings, user, onClose, }: Props) => React.JSX.Element;
export {};
