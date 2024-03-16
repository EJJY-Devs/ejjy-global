"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBirReportSP = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const birReportHelper_1 = require("./birReportHelper");
const printBirReportSP = (transactions, siteSettings, user, branchMachine) => {
    const rows = transactions.map((transaction) => (react_1.default.createElement("tr", null,
        react_1.default.createElement("td", null, (0, utils_1.formatDate)(transaction.datetime_created)),
        react_1.default.createElement("td", null, "Diana Paraiso"),
        react_1.default.createElement("td", null, "14524-15"),
        react_1.default.createElement("td", null, "Beth Paraiso"),
        react_1.default.createElement("td", null, "10/15/2020"),
        react_1.default.createElement("td", null, "4"),
        react_1.default.createElement("td", null, transaction.invoice.or_number),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.gross_amount, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.overall_discount, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN)))));
    return server_1.default.renderToStaticMarkup(react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null, birReportHelper_1.birReportStyles),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { className: "bir-reports-pdf" },
                react_1.default.createElement(birReportHelper_1.BirHeader, { branchMachine: branchMachine, siteSettings: siteSettings, user: user, title: "Solo Parents Sales Book/Report" }),
                react_1.default.createElement("table", { className: "bir-reports" },
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", { rowSpan: 2 }, "Date"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Name of Solo Parent"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "SPIC No."),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Name of child"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Birth Date of child"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Age of child"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "SI / OR Number"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Gross Sales"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Discount (VAT+Disc)"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Net Sales")),
                    rows)))));
};
exports.printBirReportSP = printBirReportSP;
