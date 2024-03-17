import React from 'react';
import { SiteSettings, User, XReadReport } from '../../../types';
interface Props {
    report: XReadReport;
    siteSettings: SiteSettings;
    user: User;
    onClose: () => void;
}
export declare const ViewXReadReportModal: ({ report, siteSettings, user, onClose, }: Props) => React.JSX.Element;
export {};
