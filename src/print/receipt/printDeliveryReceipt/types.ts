import { SiteSettings, DeliveryReceipt, User } from '../../../types';

export type PrintDeliveryReceipt = {
	deliveryReceipt: DeliveryReceipt;
	siteSettings: SiteSettings;
	user?: User;
	isPdf?: boolean;
};
