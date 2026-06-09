import { SiteSettings, ReceivingReport, User } from '../../../types';
export type PrintReceivingReport = {
    receivingReport: ReceivingReport;
    siteSettings: SiteSettings;
    user?: User;
    isPdf?: boolean;
};
