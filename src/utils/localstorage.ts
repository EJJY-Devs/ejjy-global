import {
	APP_PRINTING_TYPE,
	PrintingType,
	printingTypes,
	APP_AUTOMATIC_FULL_SCREEN,
} from '../globals';

export const getAppReceiptPrintingType = () =>
	(localStorage.getItem(APP_PRINTING_TYPE) as PrintingType) ||
	printingTypes.HTML;

export const getAppAutomaticFullScreen = () =>
	localStorage.getItem(APP_AUTOMATIC_FULL_SCREEN);
