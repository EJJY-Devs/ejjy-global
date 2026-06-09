"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.useDeliveryInvoiceCreate = void 0;
// This is now combined with useDeliveryInvoices.ts
// Export from useDeliveryInvoices for backward compatibility
var useDeliveryInvoices_1 = require("./useDeliveryInvoices");
Object.defineProperty(exports, "useDeliveryInvoiceCreate", { enumerable: true, get: function () { return useDeliveryInvoices_1.useDeliveryInvoiceCreate; } });
var useDeliveryInvoices_2 = require("./useDeliveryInvoices");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(useDeliveryInvoices_2).default; } });
