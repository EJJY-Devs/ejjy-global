"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppAutomaticFullScreen = exports.getAppReceiptPrintingType = void 0;
const globals_1 = require("../globals");
const getAppReceiptPrintingType = () => localStorage.getItem(globals_1.APP_PRINTING_TYPE) ||
    globals_1.printingTypes.HTML;
exports.getAppReceiptPrintingType = getAppReceiptPrintingType;
const getAppAutomaticFullScreen = () => localStorage.getItem(globals_1.APP_AUTOMATIC_FULL_SCREEN);
exports.getAppAutomaticFullScreen = getAppAutomaticFullScreen;
