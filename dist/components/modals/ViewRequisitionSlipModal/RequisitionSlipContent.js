"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequisitionSlipContent = void 0;
const antd_1 = require("antd");
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const constants_1 = require("../../../globals/constants");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const RequisitionSlipContent = ({ requisitionSlip }) => {
    var _a, _b;
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'product',
            key: 'name',
            render: (product) => product.name,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (quantity, item) => (0, utils_1.formatQuantity)(quantity, item.product),
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            align: 'center',
            render: (unit) => unit || constants_1.EMPTY_CELL,
        },
    ];
    const datetimeRequested = requisitionSlip.datetime_created
        ? (0, dayjs_1.default)(requisitionSlip.datetime_created).format('MM/DD/YYYY h:mmA')
        : constants_1.EMPTY_CELL;
    const currentDateTime = (0, dayjs_1.default)().format('MM/DD/YYYY h:mmA');
    return (react_1.default.createElement("div", { className: "font-mono text-sm" },
        react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement(Printing_1.ReceiptHeaderV2, { branchHeader: requisitionSlip.branch }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("strong", null, "REQUISITION SLIP"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", null, "Datetime Requested:"),
            react_1.default.createElement("div", null, datetimeRequested),
            react_1.default.createElement("br", null)),
        react_1.default.createElement("table", { style: { width: '100%' } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Reference #:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, requisitionSlip.reference_number || constants_1.EMPTY_CELL)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Vendor:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, ((_a = requisitionSlip.vendor) === null || _a === void 0 ? void 0 : _a.name) || constants_1.EMPTY_CELL)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Customer:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, ((_b = requisitionSlip.branch) === null || _b === void 0 ? void 0 : _b.name) || constants_1.EMPTY_CELL)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Encoder:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, (0, utils_1.getFullName)(requisitionSlip.prepared_by) || constants_1.EMPTY_CELL)))),
        react_1.default.createElement("br", null),
        react_1.default.createElement(antd_1.Table, { columns: columns, dataSource: requisitionSlip.products, pagination: false, rowKey: "id", size: "small" }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement("div", null,
                "Print Details: ",
                currentDateTime),
            requisitionSlip.overall_remarks && (react_1.default.createElement("div", null,
                "Remarks: ",
                requisitionSlip.overall_remarks))),
        react_1.default.createElement("br", null)));
};
exports.RequisitionSlipContent = RequisitionSlipContent;
