import React from 'react';
import { SiteSettings, User, ZReadReport } from '../../../types';
interface Props {
    report: ZReadReport;
    siteSettings: SiteSettings;
    user?: User;
    isForPrint?: boolean;
}
export declare const ZReadContent: ({ report, siteSettings, user, isForPrint, }: Props) => React.JSX.Element;
export {};
