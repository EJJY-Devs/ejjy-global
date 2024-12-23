import { APP_PRINTING_TYPE, printingTypes } from '../globals';

export const getAppReceiptPrintingType = () =>
	localStorage.getItem(APP_PRINTING_TYPE) || printingTypes.HTML;
