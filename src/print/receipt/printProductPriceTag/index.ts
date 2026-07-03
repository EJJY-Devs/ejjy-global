import { printingTypes } from '../../../globals';
import { Product, SiteSettings } from '../../../types';
import { print } from '../../helper-receipt';
import { printProductPriceTagHtml } from './printProductPriceTag.html';
import { PaperSettings } from './types';

export { PaperSettings } from './types';
export { printProductPriceTagHtml } from './printProductPriceTag.html';

export const printProductPriceTag = (
	product: Product,
	siteSettings: SiteSettings,
	paperSettings: PaperSettings,
	onComplete?: () => void,
) => {
	const data = printProductPriceTagHtml(product, siteSettings, paperSettings) || '';

	print(data, 'Product Price Tag', onComplete, printingTypes.HTML);

	return data;
};
