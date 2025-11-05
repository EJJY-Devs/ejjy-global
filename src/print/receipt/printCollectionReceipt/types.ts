import { SiteSettings, CollectionReceipt } from '../../../types';

export type PrintCollectionReceipt = {
	collectionReceipt: CollectionReceipt;
	siteSettings: SiteSettings;
	isPdf?: boolean;
};
