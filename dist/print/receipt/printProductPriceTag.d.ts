import { Product, SiteSettings } from '../../types';
type PaperSettings = {
    paperWidth: number;
    paperHeight: number;
    fontSize: number;
    fontFamily: string;
};
export declare const printProductPriceTag: (product: Product, siteSettings: SiteSettings, paperSettings: PaperSettings) => string;
export {};
