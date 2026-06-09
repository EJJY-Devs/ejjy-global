"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printAdjustmentSlipHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const Printing_1 = require("../../../components/Printing");
const utils_1 = require("../../../utils");
const globals_1 = require("../../../globals");
const dayjs_1 = __importDefault(require("dayjs"));
const helper_receipt_1 = require("../../helper-receipt");
const printAdjustmentSlipHtml = ({ adjustmentSlip, isPdf = false, }) => {
    var _a, _b;
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement("div", { style: { textAlign: 'center' } },
            react_1.default.createElement(Printing_1.ReceiptHeaderV2, { branchHeader: adjustmentSlip.branch, title: "ADJUSTMENT SLIP" }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", null, "Datetime Requested:"),
            react_1.default.createElement("div", null, (0, utils_1.formatDateTime)(adjustmentSlip.datetime_created))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { style: { width: '100%', fontSize: '12px' } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Adjustment Slip ID:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, adjustmentSlip.reference_number || globals_1.EMPTY_CELL)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Branch:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, ((_a = adjustmentSlip.branch) === null || _a === void 0 ? void 0 : _a.name) || 'N/A')),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Encoded By:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, (0, utils_1.getFullName)(adjustmentSlip.encoded_by))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Date & Time Created:"),
                    react_1.default.createElement("td", { style: { textAlign: 'right' } }, (0, utils_1.formatDateTime)(adjustmentSlip.datetime_created))))),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("div", { style: { marginTop: '16px' } }, (_b = adjustmentSlip.products) === null || _b === void 0 ? void 0 : _b.map((product, index) => {
            var _a, _b, _c, _d;
            return (react_1.default.createElement("div", { key: product.id, style: { marginBottom: '12px' } },
                react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, (_a = product === null || product === void 0 ? void 0 : product.branch_product) === null || _a === void 0 ? void 0 :
                    _a.product.name,
                    ((_c = (_b = product === null || product === void 0 ? void 0 : product.branch_product) === null || _b === void 0 ? void 0 : _b.product) === null || _c === void 0 ? void 0 : _c.is_vat_exempted)
                        ? ' - VE'
                        : ' - V'),
                react_1.default.createElement("div", { style: { marginLeft: '20px' } },
                    product.adjusted_value >= 0 ? '+' : '',
                    ' ',
                    (0, utils_1.formatQuantity)(product.adjusted_value, (_d = product === null || product === void 0 ? void 0 : product.branch_product) === null || _d === void 0 ? void 0 : _d.product),
                    product.error_remarks !== 'N/A' && product.error_remarks ? (react_1.default.createElement("span", null,
                        " Error - ",
                        product.error_remarks)) : (react_1.default.createElement("span", { style: { marginLeft: '16px' } }, product.remarks && product.remarks !== 'N/A'
                        ? product.remarks
                        : 'Spoilage'))),
                index < adjustmentSlip.products.length - 1 && react_1.default.createElement("br", null)));
        })),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { style: { textAlign: 'center' } },
            react_1.default.createElement("div", null,
                "Print Details: ",
                (0, dayjs_1.default)().format('MM/DD/YYYY h:mmA'))),
        adjustmentSlip.remarks && (react_1.default.createElement("div", { style: { textAlign: 'center', marginTop: '8px' } },
            react_1.default.createElement("div", null,
                "Overall Remarks: ",
                adjustmentSlip.remarks)))));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    return data;
};
exports.printAdjustmentSlipHtml = printAdjustmentSlipHtml;
