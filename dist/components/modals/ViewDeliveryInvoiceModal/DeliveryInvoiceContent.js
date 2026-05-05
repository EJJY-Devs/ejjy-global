"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryInvoiceContent = void 0;
const react_1 = __importDefault(require("react"));
const globals_1 = require("../../../globals");
const helper_receipt_1 = require("../../../print/helper-receipt");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const DeliveryInvoiceContent = ({ deliveryInvoice, siteSettings, isReprint, }) => {
    var _a, _b, _c;
    const totalAmount = ((_a = deliveryInvoice === null || deliveryInvoice === void 0 ? void 0 : deliveryInvoice.products) === null || _a === void 0 ? void 0 : _a.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price_per_piece || 0), 0)) || 0;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: deliveryInvoice === null || deliveryInvoice === void 0 ? void 0 : deliveryInvoice.branch_machine, title: "DELIVERY INVOICE" }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { style: { width: '100%' } }, (_b = deliveryInvoice === null || deliveryInvoice === void 0 ? void 0 : deliveryInvoice.products) === null || _b === void 0 ? void 0 : _b.map((item, index) => {
            var _a;
            return (react_1.default.createElement("tbody", { key: index },
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { colSpan: 2 }, ((_a = item === null || item === void 0 ? void 0 : item.product) === null || _a === void 0 ? void 0 : _a.name) || 'Product')),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { style: { paddingLeft: '4ch' } },
                        item.quantity,
                        " @",
                        ' ',
                        (0, utils_1.formatInPeso)(Number(item.price_per_piece), helper_receipt_1.PESO_SIGN)),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } },
                        (0, utils_1.formatInPeso)(Number(item.quantity) * Number(item.price_per_piece || 0), helper_receipt_1.PESO_SIGN),
                        "\u00A0"))));
        })),
        react_1.default.createElement("div", { style: { width: '100%', textAlign: 'right' } }, "----------------"),
        react_1.default.createElement("table", { style: { width: '100%' } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "TOTAL AMOUNT"),
                    react_1.default.createElement("td", { style: { textAlign: 'right', fontWeight: 'bold' } },
                        (0, utils_1.formatInPeso)(totalAmount, helper_receipt_1.PESO_SIGN),
                        "\u00A0")))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { style: { width: '100%' } },
            "datetime_created",
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { style: { width: 130 } }, "DATE:"),
                    react_1.default.createElement("td", null, (0, utils_1.formatDateTime)(deliveryInvoice === null || deliveryInvoice === void 0 ? void 0 : deliveryInvoice.created_at))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "REFERENCE #:"),
                    react_1.default.createElement("td", null, (deliveryInvoice === null || deliveryInvoice === void 0 ? void 0 : deliveryInvoice.id) || globals_1.EMPTY_CELL)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "ITEMS:"),
                    react_1.default.createElement("td", null,
                        ((_c = deliveryInvoice === null || deliveryInvoice === void 0 ? void 0 : deliveryInvoice.products) === null || _c === void 0 ? void 0 : _c.length) || 0,
                        " item(s)")))),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: {
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
            } },
            isReprint && react_1.default.createElement("span", null, "REPRINT ONLY"),
            react_1.default.createElement("span", null,
                "\"", siteSettings === null || siteSettings === void 0 ? void 0 :
                siteSettings.thank_you_message,
                "\""))));
};
exports.DeliveryInvoiceContent = DeliveryInvoiceContent;
