"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashCollectionVoucherContent = void 0;
const react_1 = __importDefault(require("react"));
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const Printing_1 = require("../../../components/Printing");
const helper_receipt_1 = require("../../helper-receipt");
const constants_1 = require("./constants");
const CashCollectionVoucherContent = ({ cashBreakdown, siteSettings, user, }) => {
    const metadata = cashBreakdown.cash_collection_metadata;
    const { collector } = metadata;
    const datetime = (0, utils_1.formatDateTime)(cashBreakdown.datetime_created);
    const amount = (0, utils_1.formatInPeso)(metadata.amount, helper_receipt_1.PESO_SIGN);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: cashBreakdown.branch_machine, title: constants_1.CASH_COLLECTION_VOUCHER_TITLE }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { style: { width: '100%', fontSize: '12px' } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { style: { width: '130px' } }, "Collector:"),
                    react_1.default.createElement("td", null, collector)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Amount:"),
                    react_1.default.createElement("td", null, amount)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Remarks:"),
                    react_1.default.createElement("td", null, cashBreakdown.remarks)))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", null,
            "GDT: ",
            datetime),
        react_1.default.createElement("div", null,
            "PDT: ",
            (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)),
        react_1.default.createElement("div", null, user === null || user === void 0 ? void 0 : user.employee_id),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings })));
};
exports.CashCollectionVoucherContent = CashCollectionVoucherContent;
