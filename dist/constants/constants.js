"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTOMATIC_GENERATED_REPORT_USER_NAME = exports.DESKTOP_FOLDER_OPEN_FUNCTION = exports.EJOURNAL_FOLDER = exports.JSPDF_SETTINGS = exports.RECEIPT_DEFAULT_FONT_SIZE = exports.RECEIPT_DEFAULT_FONT_FAMILY = exports.DATE_FORMAT = exports.ROW_HEIGHT = exports.SEARCH_DEBOUNCE_TIME = exports.NOT_FOUND_INDEX = exports.VIEW_PRINTING_MODAL_WIDTH = exports.QUANTITY_NON_WEIGHING_PRECISION = exports.QUANTITY_WEIGHING_PRECISION = exports.ADMIN_PASSWORD = exports.EMPTY_CELL = exports.GENERIC_BRANCH_ERROR_MESSAGE = exports.GENERIC_STATUS_500_MESSAGE = exports.GENERIC_ERROR_MESSAGE = exports.NOTIFICATION_INTERVAL_MS = exports.REPORTS_RETRY_INTERVAL_MS = exports.RETRY_INTERVAL_MS = exports.MAX_RETRY = exports.MAX_PAGE_SIZE = exports.DEFAULT_PAGE_SIZE = exports.DEFAULT_PAGE = void 0;
// Request
exports.DEFAULT_PAGE = 1;
exports.DEFAULT_PAGE_SIZE = 10;
exports.MAX_PAGE_SIZE = 500;
exports.MAX_RETRY = 1;
exports.RETRY_INTERVAL_MS = 300;
exports.REPORTS_RETRY_INTERVAL_MS = 30000;
exports.NOTIFICATION_INTERVAL_MS = 10000;
exports.GENERIC_ERROR_MESSAGE = "An error occurred while processing your request.";
exports.GENERIC_STATUS_500_MESSAGE = "An error occurred in the server while processing your request.";
exports.GENERIC_BRANCH_ERROR_MESSAGE = "An error occurred while requesting on a local branch";
// UI
exports.EMPTY_CELL = "-";
exports.ADMIN_PASSWORD = "generic123";
exports.QUANTITY_WEIGHING_PRECISION = 3;
exports.QUANTITY_NON_WEIGHING_PRECISION = 0;
exports.VIEW_PRINTING_MODAL_WIDTH = 425;
exports.NOT_FOUND_INDEX = -1;
exports.SEARCH_DEBOUNCE_TIME = 500;
exports.ROW_HEIGHT = 65;
exports.DATE_FORMAT = "MM/DD/YYYY";
exports.RECEIPT_DEFAULT_FONT_FAMILY = "monospace";
exports.RECEIPT_DEFAULT_FONT_SIZE = "12";
exports.JSPDF_SETTINGS = {
    orientation: "p",
    unit: "px",
    format: [400, 700],
    hotfixes: ["px_scaling"],
};
exports.EJOURNAL_FOLDER = "media";
exports.DESKTOP_FOLDER_OPEN_FUNCTION = "openFolder";
exports.AUTOMATIC_GENERATED_REPORT_USER_NAME = "Auto";
