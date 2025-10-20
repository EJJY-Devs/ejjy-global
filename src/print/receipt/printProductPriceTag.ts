import { Product, SiteSettings } from '../../types';
import { formatInPeso } from '../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../helper-receipt';
import { print } from '../helper-receipt';

type PaperSettings = {
	paperWidth: number;
	paperHeight: number;
	fontSize: number;
	fontFamily: string;
};

export const printProductPriceTagHtml = (
	product: Product,
	siteSettings: SiteSettings,
	paperSettings: PaperSettings,
) => {
	const name =
		(product.name || product.price_tag_print_details)?.replace('\n', '<br/>') ||
		EMPTY_CELL;
	const price = formatInPeso(product.price_per_piece, PESO_SIGN);

	return `
	<div style="
    width: ${paperSettings.paperWidth}mm;
    height: ${Math.floor(paperSettings.paperHeight * 0.9)}mm;
    padding: 1mm 2mm 0 2mm;
    display: flex;
    flex-direction: column;
    font-size: ${paperSettings.fontSize}px;
    font-family: ${paperSettings.fontFamily};
    line-height: 100%;
    color: black;
    overflow:hidden;
  ">
    <div style="height: 2.2em; overflow: hidden; font-size: 1em; line-height: 1.1em;">${name}</div>
    <div style="width: 100%; margin: 4px 0; border-bottom: 0.25px solid black;"></div>
    <div style="font-size: 1.23em; text-align: right;">${price}</div>
    <div style="margin-top: auto; font-size: 0.46em; text-align: center; line-height: 100%;">${siteSettings?.store_name}</div>
	</div>
	`;
};

export const printProductPriceTag = (
	product: Product,
	siteSettings: SiteSettings,
	paperSettings: PaperSettings,
	onComplete?: () => void,
) => {
	const htmlData = printProductPriceTagHtml(
		product,
		siteSettings,
		paperSettings,
	);

	// Print the HTML data
	print(htmlData, 'Product Price Tag', onComplete, 'HTML');

	return htmlData;
};
