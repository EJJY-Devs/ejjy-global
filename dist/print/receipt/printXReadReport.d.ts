import { SiteSettings, User, XReadReport } from '../../types';
export declare const printXReadReport: (report: XReadReport, siteSettings: SiteSettings, user: User, isPdf?: boolean) => string | undefined;
