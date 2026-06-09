import { SiteSettings, User, XReadReport } from '../../types';
export declare const createXReadTxt: (report: XReadReport, siteSettings: SiteSettings, user?: User, returnContent?: boolean) => string | null;
