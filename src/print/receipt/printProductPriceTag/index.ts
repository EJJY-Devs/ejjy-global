import { printingTypes } from '../../../globals';
import { Product, SiteSettings } from '../../../types';
import { getAppReceiptPrintingType } from '../../../utils/localstorage';
import { print } from '../../helper-receipt';
import { printProductPriceTagHtml } from './printProductPriceTag.html';
import { printProductPriceTagNative } from './printProductPriceTag.native';
import { PaperSettings } from './types';

export { PaperSettings } from './types';
export { printProductPriceTagHtml } from './printProductPriceTag.html';

export const printProductPriceTag = (
	product: Product,
	siteSettings: SiteSettings,
	paperSettings: PaperSettings,
	onComplete?: () => void,
) => {
	const printingType = getAppReceiptPrintingType();

	let data: string | string[] = '';

	if (printingType === printingTypes.HTML) {
		data = printProductPriceTagHtml(product, siteSettings, paperSettings) || '';
	} else if (printingType === printingTypes.NATIVE) {
		data = printProductPriceTagNative(product, siteSettings, paperSettings);
	}

	print(data, 'Product Price Tag', onComplete, printingType);

	return printingType === printingTypes.HTML ? (data as string) : undefined;
};
