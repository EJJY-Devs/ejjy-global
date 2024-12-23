import { APP_PRINTING_TYPE, PrintingType, printingTypes } from '../globals';

export const getAppReceiptPrintingType = () =>
	(localStorage.getItem(APP_PRINTING_TYPE) as PrintingType) ||
	printingTypes.HTML;
