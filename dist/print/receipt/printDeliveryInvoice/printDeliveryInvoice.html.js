"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeliveryInvoiceHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const DeliveryInvoiceContent_1 = require("../../../components/modals/ViewDeliveryInvoiceModal/DeliveryInvoiceContent");
const helper_receipt_1 = require("../../helper-receipt");
const printDeliveryInvoiceHtml = ({ deliveryInvoice, siteSettings, isReprint = false, isPdf = false, }) => {
    let data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(DeliveryInvoiceContent_1.DeliveryInvoiceContent, { deliveryInvoice: deliveryInvoice, siteSettings: siteSettings, isReprint: isReprint })));
    if (isPdf) {
        data = (0, helper_receipt_1.appendHtmlElement)(data);
    }
    return data;
};
exports.printDeliveryInvoiceHtml = printDeliveryInvoiceHtml;
