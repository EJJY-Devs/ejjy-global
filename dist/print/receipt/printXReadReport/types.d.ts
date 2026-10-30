import { SiteSettings, XReadReport, User } from '../../../types';
export type PrintXReadReport = {
    report: XReadReport;
    siteSettings: SiteSettings;
    user?: User;
    isPdf?: boolean;
};
