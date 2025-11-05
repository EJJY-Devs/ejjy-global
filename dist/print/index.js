"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePrinter = void 0;
var helper_receipt_1 = require("./helper-receipt");
Object.defineProperty(exports, "configurePrinter", { enumerable: true, get: function () { return helper_receipt_1.configurePrinter; } });
__exportStar(require("./receipt/birReports"), exports);
__exportStar(require("./receipt/printAdjustmentReport"), exports);
__exportStar(require("./receipt/printAdjustmentSlip"), exports);
__exportStar(require("./receipt/printCancelledTransactions"), exports);
__exportStar(require("./receipt/printCashBreakdown"), exports);
__exportStar(require("./receipt/printCashOut"), exports);
__exportStar(require("./receipt/printCollectionReceipt"), exports);
__exportStar(require("./receipt/printDailyItemSold"), exports);
__exportStar(require("./receipt/printDailySales"), exports);
__exportStar(require("./receipt/printUnsoldItem"), exports);
__exportStar(require("./receipt/printDeliveryReceipt"), exports);
__exportStar(require("./receipt/printDtr"), exports);
__exportStar(require("./receipt/printEmployeeCode"), exports);
__exportStar(require("./receipt/printOrderOfPayment"), exports);
__exportStar(require("./receipt/printOrderSlip"), exports);
__exportStar(require("./receipt/printProductPriceTag"), exports);
__exportStar(require("./receipt/printReceivingReport"), exports);
__exportStar(require("./receipt/printRequisitionSlip"), exports);
__exportStar(require("./receipt/printSalesInvoice"), exports);
__exportStar(require("./receipt/printXReadReport"), exports);
__exportStar(require("./receipt/printZReadReport"), exports);
__exportStar(require("./txt/createDailySalesTxt"), exports);
__exportStar(require("./txt/createSalesInvoiceTxt"), exports);
__exportStar(require("./txt/createXReadTxt"), exports);
__exportStar(require("./txt/createZReadTxt"), exports);
__exportStar(require("./utils/cashier"), exports);
__exportStar(require("./receipt/printSalesInvoice/printSalesInvoice.native"), exports);
