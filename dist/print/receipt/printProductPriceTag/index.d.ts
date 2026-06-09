import { Product, SiteSettings } from '../../../types';
import { PaperSettings } from './types';
export { PaperSettings } from './types';
export { printProductPriceTagHtml } from './printProductPriceTag.html';
export declare const printProductPriceTag: (product: Product, siteSettings: SiteSettings, paperSettings: PaperSettings, onComplete?: () => void) => string | undefined;
