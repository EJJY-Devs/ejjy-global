import { SiteSettings, RequisitionSlip, User } from '../../../types';
export type PrintRequisitionSlip = {
    requisitionSlip: RequisitionSlip;
    siteSettings: SiteSettings;
    user?: User;
    isPdf?: boolean;
};
