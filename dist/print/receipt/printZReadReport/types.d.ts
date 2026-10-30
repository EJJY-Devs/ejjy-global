import { SiteSettings, ZReadReport, User } from '../../../types';
export type PrintZReadReport = {
    report: ZReadReport;
    siteSettings: SiteSettings;
    user?: User;
    isPdf?: boolean;
};
