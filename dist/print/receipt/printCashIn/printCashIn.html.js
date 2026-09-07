"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashInHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const helper_receipt_1 = require("../../helper-receipt");
const CashInVoucherContent_1 = require("./CashInVoucherContent");
const printCashInHtml = ({ cashBreakdown, siteSettings, user, isPdf = false, }) => {
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(CashInVoucherContent_1.CashInVoucherContent, { cashBreakdown: cashBreakdown, siteSettings: siteSettings, user: user })));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    return data;
};
exports.printCashInHtml = printCashInHtml;
