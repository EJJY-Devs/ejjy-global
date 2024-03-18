import React from 'react';
import { SiteSettings, User, XReadReport } from '../../../types';
interface Props {
    report: XReadReport;
    siteSettings: SiteSettings;
    user: User;
    isForPrint: boolean;
}
export declare const XReadContent: ({ report, siteSettings, user, isForPrint, }: Props) => React.JSX.Element;
export {};
