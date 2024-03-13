import React from 'react';
import { SiteSettings, ZReadReport } from '../../../types';
interface Props {
    report: ZReadReport;
    siteSettings: SiteSettings;
    onClose: () => void;
}
export declare const ViewZReadReportModal: ({ report, siteSettings, onClose, }: Props) => React.JSX.Element;
export {};
