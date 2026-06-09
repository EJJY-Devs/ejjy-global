"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCollectionReceiptHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const CollectionReceiptContent_1 = require("../../../components/modals/ViewCollectionReceiptModal/CollectionReceiptContent");
const helper_receipt_1 = require("../../helper-receipt");
const printCollectionReceiptHtml = ({ collectionReceipt, siteSettings, isPdf = false, }) => {
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(CollectionReceiptContent_1.CollectionReceiptContent, { collectionReceipt: collectionReceipt, siteSettings: siteSettings })));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    return data;
};
exports.printCollectionReceiptHtml = printCollectionReceiptHtml;
