"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printOrderOfPaymentHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const helper_receipt_1 = require("../../helper-receipt");
const OrderOfPaymentContent_1 = require("../../../components/modals/ViewOrderOfPaymentModal/OrderOfPaymentContent");
const printOrderOfPaymentHtml = ({ orderOfPayment, isPdf = false, }) => {
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(OrderOfPaymentContent_1.OrderOfPaymentContent, { orderOfPayment: orderOfPayment })));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    return data;
};
exports.printOrderOfPaymentHtml = printOrderOfPaymentHtml;
