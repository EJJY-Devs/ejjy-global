"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XReadContent = void 0;
const react_1 = __importDefault(require("react"));
const no_transaction_png_1 = __importDefault(require("../../../../public/no-transaction.png"));
const globals_1 = require("../../../globals");
const utils_1 = require("../../../utils");
const Printing_1 = require("../../Printing");
const XAccruedContent_1 = require("./components/XAccruedContent");
const XEjournalContent_1 = require("./components/XEjournalContent");
const XReadContent = ({ report, siteSettings, user, isForPrint, }) => {
    var _a, _b;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        report.gross_sales === 0 && !isForPrint && (react_1.default.createElement("img", { alt: "no transaction", className: "w-full absolute top-0 left-0 pointer-events-none", src: no_transaction_png_1.default })),
        react_1.default.createElement(Printing_1.ReceiptHeader, { branchMachine: report.branch_machine, siteSettings: siteSettings }),
        react_1.default.createElement("div", { className: "mt-4" }, report.generated_by ? (react_1.default.createElement(XAccruedContent_1.XAccruedContent, { report: report })) : (react_1.default.createElement(XEjournalContent_1.XEjournalContent, { report: report }))),
        react_1.default.createElement(Printing_1.Divider, null),
        react_1.default.createElement("div", null,
            "GDT:",
            ' ',
            report.generation_datetime
                ? (0, utils_1.formatDateTime)(report.generation_datetime)
                : globals_1.EMPTY_CELL),
        react_1.default.createElement("div", null,
            "PDT:",
            ' ',
            report.printing_datetime
                ? (0, utils_1.formatDateTime)(report.printing_datetime)
                : globals_1.EMPTY_CELL),
        react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between' } },
            react_1.default.createElement("div", null,
                "C: ",
                ((_a = report === null || report === void 0 ? void 0 : report.cashiering_session) === null || _a === void 0 ? void 0 : _a.user.employee_id) || globals_1.EMPTY_CELL),
            react_1.default.createElement("div", null,
                "PB:",
                ' ',
                (user === null || user === void 0 ? void 0 : user.employee_id) || ((_b = report === null || report === void 0 ? void 0 : report.generated_by) === null || _b === void 0 ? void 0 : _b.employee_id) || globals_1.EMPTY_CELL)),
        react_1.default.createElement("br", null),
        react_1.default.createElement(Printing_1.ReceiptFooter, { siteSettings: siteSettings })));
};
exports.XReadContent = XReadContent;
