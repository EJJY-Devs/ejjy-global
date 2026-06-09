import { SiteSettings, User } from '../../types';
export declare const printOrderSlip: (orderSlip: any, products: any, user: User, quantityType: string, siteSettings: SiteSettings, isPdf?: boolean) => string | undefined;
