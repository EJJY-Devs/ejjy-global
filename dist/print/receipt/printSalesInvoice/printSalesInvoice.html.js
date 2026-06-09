"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSalesInvoiceHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const TransactionContent_1 = require("../../../components/modals/ViewTransactionModal/TransactionContent");
const helper_receipt_1 = require("../../helper-receipt");
const printSalesInvoiceHtml = ({ transaction, siteSettings, isReprint = false, isPdf = false, }) => {
    let data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(TransactionContent_1.TransactionContent, { transaction: transaction, siteSettings: siteSettings, isReprint: isReprint })));
    if (isPdf) {
        data = (0, helper_receipt_1.appendHtmlElement)(data);
    }
    return data;
};
exports.printSalesInvoiceHtml = printSalesInvoiceHtml;
