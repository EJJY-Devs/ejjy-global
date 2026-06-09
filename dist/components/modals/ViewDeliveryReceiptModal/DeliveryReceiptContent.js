"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryReceiptContent = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../../print/helper-receipt");
const Printing_1 = require("../../Printing");
const DeliveryReceiptContent = ({ deliveryReceipt }) => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(Printing_1.ReceiptHeader, { title: "DELIVERY RECEIPT", branchHeader: deliveryReceipt.branch }),
    react_1.default.createElement("br", null),
    react_1.default.createElement("table", { style: { width: '100%', borderCollapse: 'collapse' } },
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { style: { textAlign: 'left' } }, "Product Name"),
                react_1.default.createElement("th", { style: { textAlign: 'center' } }, "Quantity")),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 2, style: { borderBottom: '1px solid black' } }))),
        react_1.default.createElement("tbody", null, deliveryReceipt.products.map((item, index) => (react_1.default.createElement("tr", { key: index },
            react_1.default.createElement("td", null, item.product.name),
            react_1.default.createElement("td", { style: { textAlign: 'center' } }, (0, utils_1.formatQuantity)(Number(item.quantity_returned), item.product))))))),
    react_1.default.createElement("br", null),
    react_1.default.createElement("table", { style: { width: '100%' } },
        react_1.default.createElement("tbody", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null,
                    "Customer: ",
                    (deliveryReceipt === null || deliveryReceipt === void 0 ? void 0 : deliveryReceipt.customer_name) || helper_receipt_1.EMPTY_CELL),
                react_1.default.createElement("td", { style: { textAlign: 'right' } },
                    "Encoder: ",
                    (0, utils_1.getFullName)(deliveryReceipt === null || deliveryReceipt === void 0 ? void 0 : deliveryReceipt.encoded_by) || helper_receipt_1.EMPTY_CELL)))),
    react_1.default.createElement("br", null),
    react_1.default.createElement("div", null,
        "Remarks: ", deliveryReceipt === null || deliveryReceipt === void 0 ? void 0 :
        deliveryReceipt.overall_remarks),
    react_1.default.createElement("br", null),
    react_1.default.createElement("div", null,
        "GDT: ",
        (0, utils_1.formatDateTime)(deliveryReceipt === null || deliveryReceipt === void 0 ? void 0 : deliveryReceipt.datetime_created)),
    react_1.default.createElement("div", null,
        "PDT: ",
        (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)),
    react_1.default.createElement("br", null)));
exports.DeliveryReceiptContent = DeliveryReceiptContent;
