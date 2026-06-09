"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivingReportContent = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../../print/helper-receipt");
const Printing_1 = require("../../Printing");
const ReceivingReportContent = ({ receivingReport }) => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(Printing_1.ReceiptHeader, { title: "RECEIVING REPORT", branchHeader: receivingReport.branch }),
    react_1.default.createElement("br", null),
    react_1.default.createElement("table", { style: { width: '100%' } },
        react_1.default.createElement("tbody", null, receivingReport.receiving_voucher_products.map((item, index) => (react_1.default.createElement(react_1.default.Fragment, { key: index },
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, item.product.name)),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { style: { paddingLeft: 30 } }, (0, utils_1.formatQuantity)(item.quantity, item.product)))))))),
    react_1.default.createElement("br", null),
    react_1.default.createElement("table", { style: { width: '100%' } },
        react_1.default.createElement("tbody", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null,
                    "Encoder: ",
                    (0, utils_1.getFullName)(receivingReport === null || receivingReport === void 0 ? void 0 : receivingReport.encoded_by) || helper_receipt_1.EMPTY_CELL),
                react_1.default.createElement("td", { style: { textAlign: 'right' } },
                    "Inspector: ",
                    (0, utils_1.getFullName)(receivingReport.checked_by) || helper_receipt_1.EMPTY_CELL)))),
    react_1.default.createElement("br", null),
    react_1.default.createElement("div", null,
        "Vendor: ",
        receivingReport.supplier_name),
    react_1.default.createElement("br", null),
    react_1.default.createElement("div", null,
        "GDT: ",
        (0, utils_1.formatDateTime)(receivingReport.datetime_created)),
    react_1.default.createElement("div", null,
        "PDT: ",
        (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)),
    react_1.default.createElement("br", null)));
exports.ReceivingReportContent = ReceivingReportContent;
