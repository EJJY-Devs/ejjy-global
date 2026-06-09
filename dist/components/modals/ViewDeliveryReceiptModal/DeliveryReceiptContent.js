"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryReceiptContent = void 0;
const antd_1 = require("antd");
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const constants_1 = require("../../../globals/constants");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const DeliveryReceiptContent = ({ deliveryReceipt }) => {
    var _a;
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'product',
            key: 'name',
            render: (product) => product.name,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity_returned',
            key: 'quantity',
            align: 'center',
            render: (quantity, item) => (0, utils_1.formatQuantity)(Number(quantity), item.product),
        },
    ];
    const currentDateTime = (0, dayjs_1.default)().format('MM/DD/YYYY h:mmA');
    const datetimeGenerated = deliveryReceipt.datetime_created
        ? (0, dayjs_1.default)(deliveryReceipt.datetime_created).format('MM/DD/YYYY h:mmA')
        : constants_1.EMPTY_CELL;
    return (react_1.default.createElement("div", { className: "font-mono text-sm" },
        react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement(Printing_1.ReceiptHeaderV2, { branchHeader: deliveryReceipt.branch }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("strong", null, "DELIVERY RECEIPT"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", null, "Datetime Generated:"),
            react_1.default.createElement("div", null, datetimeGenerated),
            react_1.default.createElement("br", null)),
        react_1.default.createElement("table", { style: { width: '100%' } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Reference #:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, deliveryReceipt.reference_number || constants_1.EMPTY_CELL)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Vendor:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, ((_a = deliveryReceipt.branch) === null || _a === void 0 ? void 0 : _a.name) || constants_1.EMPTY_CELL)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Customer:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, deliveryReceipt.customer_name || constants_1.EMPTY_CELL)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Encoder:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, (0, utils_1.getFullName)(deliveryReceipt.encoded_by) || constants_1.EMPTY_CELL)))),
        react_1.default.createElement("br", null),
        react_1.default.createElement(antd_1.Table, { columns: columns, dataSource: deliveryReceipt.products, pagination: false, rowKey: "id", size: "small" }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement("div", null,
                "Print Details: ",
                currentDateTime),
            deliveryReceipt.overall_remarks && (react_1.default.createElement("div", null,
                "Remarks: ",
                deliveryReceipt.overall_remarks))),
        react_1.default.createElement("br", null)));
};
exports.DeliveryReceiptContent = DeliveryReceiptContent;
