"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppReceiptPrintingType = void 0;
const globals_1 = require("../globals");
const getAppReceiptPrintingType = () => localStorage.getItem(globals_1.APP_PRINTING_TYPE) || globals_1.printingTypes.HTML;
exports.getAppReceiptPrintingType = getAppReceiptPrintingType;
