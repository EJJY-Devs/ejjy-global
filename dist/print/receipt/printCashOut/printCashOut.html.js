"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCashOutHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../../utils");
const Printing_1 = require("../../../components/Printing");
const helper_receipt_1 = require("../../helper-receipt");
const helper_receipt_2 = require("../../helper-receipt");
const printCashOutHtml = ({ cashOut, siteSettings, isPdf = false, }) => {
    const metadata = cashOut.cash_out_metadata;
    const { payee, particulars, received_by: receivedBy, prepared_by_user: preparedByUser, } = metadata;
    const datetime = (0, utils_1.formatDateTime)(cashOut.datetime_created);
    const amount = (0, utils_1.formatInPeso)(metadata.amount, helper_receipt_1.PESO_SIGN);
    const preparedBy = (0, utils_1.getFullName)(metadata.prepared_by_user);
    const approvedBy = (0, utils_1.getFullName)(metadata.approved_by_user);
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_2.getPageStyleObject)() },
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: cashOut.branch_machine, title: "DISBURSEMENT VOUCHER" }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("table", { style: { width: '100%', fontSize: '12px' } },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { style: { width: '130px' } }, "Payee:"),
                    react_1.default.createElement("td", null, payee)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Particulars:"),
                    react_1.default.createElement("td", null, particulars)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Amount:"),
                    react_1.default.createElement("td", null, amount)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Received by:"),
                    react_1.default.createElement("td", null, receivedBy)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Prepared by:"),
                    react_1.default.createElement("td", null, preparedBy)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Approved by:"),
                    react_1.default.createElement("td", null, approvedBy)))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", null,
            "GDT: ",
            datetime),
        react_1.default.createElement("div", null,
            "PDT: ",
            (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)),
        react_1.default.createElement("div", null, preparedByUser.employee_id),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings })));
    if (isPdf) {
        return (0, helper_receipt_2.appendHtmlElement)(data);
    }
    return data;
};
exports.printCashOutHtml = printCashOutHtml;
