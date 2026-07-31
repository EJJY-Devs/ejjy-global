import { DeliveryInvoice, SiteSettings } from '../../../types';

export type PrintDeliveryInvoice = {
	deliveryInvoice: DeliveryInvoice;
	siteSettings: SiteSettings;
	isReprint?: boolean;
	isPdf?: boolean;
};
