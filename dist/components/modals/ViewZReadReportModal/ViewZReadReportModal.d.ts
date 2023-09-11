import { SiteSettings, ZReadReport } from 'ejjy-global';
import React from 'react';
interface Props {
    report: ZReadReport;
    siteSettings: SiteSettings;
    onClose: () => void;
}
export declare const ViewZReadReportModal: ({ report, siteSettings, onClose, }: Props) => React.JSX.Element;
export {};
