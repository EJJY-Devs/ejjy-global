import { Product, SiteSettings } from '../../../types';
import { formatInPeso } from '../../../utils';
import { EMPTY_CELL, PESO_SIGN } from '../../helper-receipt';
import { PaperSettings } from './types';

export const printProductPriceTagHtml = (
	product: Product,
	siteSettings: SiteSettings,
	paperSettings: PaperSettings,
) => {
	const name =
		product.price_tag_print_details?.replace(/\n/g, '<br/>') || EMPTY_CELL;
	const price = formatInPeso(product.price_per_piece, PESO_SIGN);

	return `
	<div style="
    width: ${paperSettings.paperWidth}mm;
    height: ${Math.floor(paperSettings.paperHeight * 0.9)}mm;
    padding: 1mm 2mm 0 2mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: ${paperSettings.fontSize}px;
    font-family: ${paperSettings.fontFamily};
    line-height: 100%;
    color: black;
    overflow: hidden;
  ">
    <div style="max-height: 3.3em; overflow: hidden; font-size: 1em; line-height: 1.1em; word-wrap: break-word; overflow-wrap: break-word;">${name}</div>
    <div style="font-size: 1.53em; text-align: right; flex-shrink: 0; margin-top: auto;">${price}</div>
	</div>
	`;
};
