export const LOCAL_API_URL = process.env.REACT_APP_LOCAL_API_URL;
export const ONLINE_API_URL = process.env.REACT_APP_ONLINE_API_URL;
export const EXPRESS_API_URL = process.env.REACT_APP_EXPRESS_API_URL;
export const API_TIMEOUT_MS = 0;

// Request
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 500;
export const MAX_RETRY = 1;
export const RETRY_INTERVAL_MS = 300;
export const REPORTS_RETRY_INTERVAL_MS = 30000;
export const NOTIFICATION_INTERVAL_MS = 10000;
export const GENERIC_ERROR_MESSAGE =
	'An error occurred while processing your request.';
export const GENERIC_STATUS_500_MESSAGE =
	'An error occurred in the server while processing your request.';
export const GENERIC_BRANCH_ERROR_MESSAGE =
	'An error occurred while requesting on a local branch';
export const NO_VERIFICATION_NEEDED = 'NO_VERIFICATION_NEEDED';
export const NO_VERIFICATION_CONFIG = { params: NO_VERIFICATION_NEEDED };

// UI
export const EMPTY_CELL = '-';

export const ADMIN_PASSWORD = 'generic123';
export const QUANTITY_WEIGHING_PRECISION = 3;
export const QUANTITY_NON_WEIGHING_PRECISION = 0;
export const VIEW_PRINTING_MODAL_WIDTH = 425;
export const NOT_FOUND_INDEX = -1;
export const SEARCH_DEBOUNCE_TIME = 500;
export const ROW_HEIGHT = 65;
export const DATE_FORMAT = 'MM/DD/YY';
export const DATE_FORMAT_UI = 'MM/DD/YYYY';
export const DATE_FORMAT_API = 'YYYY-MM-DD';
export const TIME_FORMAT_UI = 'h:mmA';
export const RECEIPT_DEFAULT_FONT_FAMILY = 'monospace';
export const RECEIPT_DEFAULT_FONT_SIZE = '12';
export const JSPDF_SETTINGS = {
	orientation: 'p',
	unit: 'px',
	format: [400, 700],
	hotfixes: ['px_scaling'],
};
export const EJOURNAL_FOLDER = 'media';
export const DESKTOP_FOLDER_OPEN_FUNCTION = 'openFolder';
export const AUTOMATIC_GENERATED_REPORT_USER_NAME = 'Auto';
export const INVOICE_LAST_MESSAGE = 'This Serves As Your Official Receipt';
export const REPRINT_ONLY_MESSAGE = 'REPRINT ONLY';

// Localstorgae
export const APP_PRINTING_TYPE = 'EJJY_PRINTING_TYPE';
export const APP_AUTOMATIC_FULL_SCREEN = 'EJJY_AUTOMATIC_FULL_SCREEN';
