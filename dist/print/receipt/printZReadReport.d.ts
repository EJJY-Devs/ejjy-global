import { SiteSettings, User, ZReadReport } from '../../types';
export declare const printZReadReport: (report: ZReadReport, siteSettings: SiteSettings, user: User, isPdf?: boolean) => string | undefined;
