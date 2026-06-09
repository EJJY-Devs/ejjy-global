"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequisitionSlipContent = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const RequisitionSlipContent = ({ requisitionSlip, user }) => {
    var _a, _b;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Printing_1.ReceiptHeader, { title: "REQUISITION SLIP", branchHeader: requisitionSlip.branch }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { style: { width: '100%' } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Date & Time Requested:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, (0, utils_1.formatDateTime)(requisitionSlip.datetime_created))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Requestor:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, (0, utils_1.getFullName)(requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.approved_by))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Customer:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, (_a = requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.branch) === null || _a === void 0 ? void 0 : _a.name)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "ID:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.reference_number)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Vendor:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, (_b = requisitionSlip === null || requisitionSlip === void 0 ? void 0 : requisitionSlip.vendor) === null || _b === void 0 ? void 0 : _b.name)))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { style: { width: '100%', borderCollapse: 'collapse' } },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { style: { textAlign: 'left' } }, "Product Name"),
                    react_1.default.createElement("th", { style: { textAlign: 'center' } }, "Unit"),
                    react_1.default.createElement("th", { style: { textAlign: 'center' } }, "Quantity")),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { colSpan: 3, style: { borderBottom: '1px solid black' } }))),
            react_1.default.createElement("tbody", null, requisitionSlip.products.map(({ quantity, product, unit }, index) => (react_1.default.createElement("tr", { key: index },
                react_1.default.createElement("td", null, product.name),
                react_1.default.createElement("td", { style: { textAlign: 'center' } }, unit || ''),
                react_1.default.createElement("td", { style: { textAlign: 'center' } }, (0, utils_1.formatQuantity)(quantity, product))))))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { style: { width: '100%' } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Print Details:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } },
                        (0, dayjs_1.default)().format('MM/DD/YYYY h:mmA'),
                        " ", user === null || user === void 0 ? void 0 :
                        user.employee_id))))));
};
exports.RequisitionSlipContent = RequisitionSlipContent;
