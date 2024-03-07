import { RequisitionSlip, SiteSettings, User } from '../../types';
export declare const printRequisitionSlip: (requisitionSlip: RequisitionSlip, siteSettings: SiteSettings, user: User, isPdf?: boolean) => string | undefined;
