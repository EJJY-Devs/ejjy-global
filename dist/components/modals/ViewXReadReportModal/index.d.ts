import React from 'react';
import { SiteSettings, XReadReport } from '../../../types';
interface Props {
    report: XReadReport;
    siteSettings: SiteSettings;
    onClose: () => void;
}
export declare const ViewXReadReportModal: ({ report, siteSettings, onClose, }: Props) => React.JSX.Element;
export {};
