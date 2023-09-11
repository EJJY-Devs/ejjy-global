import { SiteSettings, XReadReport } from 'ejjy-global';
import React from 'react';
import '../style.scss';
interface Props {
    report: XReadReport;
    siteSettings: SiteSettings;
    onClose: () => void;
}
export declare const ViewXReadReportModal: ({ report, siteSettings, onClose, }: Props) => React.JSX.Element;
export {};
