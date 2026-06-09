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
const globals_1 = require("../../../globals");
const printBirReportSP = (transactions, siteSettings, user, branchMachine) => {
    const rows = transactions.map((transaction) => {
        const fields = (0, utils_1.getDiscountFields)(globals_1.specialDiscountCodes.SOLO_PARENTS, transaction.discount_option_additional_fields_values || '');
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("td", null, (0, utils_1.formatDate)(transaction.datetime_created)),
            react_1.default.createElement("td", null, fields.name),
            react_1.default.createElement("td", null, fields.id),
            react_1.default.createElement("td", null, fields.childName),
            react_1.default.createElement("td", null, fields.childBirthdate),
            react_1.default.createElement("td", null, fields.childAge),
            react_1.default.createElement("td", null, transaction.invoice.or_number),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.gross_amount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.overall_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN))));
    });
    return server_1.default.renderToStaticMarkup(react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null, birReportHelper_1.birReportStyles),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { className: "bir-reports-pdf" },
                react_1.default.createElement(birReportHelper_1.BirHeader, { branchMachine: branchMachine, siteSettings: siteSettings, user: user, title: "Solo Parents Sales Book/Report" }),
                react_1.default.createElement("table", { className: "bir-reports" },
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "Date"),
                        react_1.default.createElement("th", null, "Name of Solo Parent"),
                        react_1.default.createElement("th", null, "SPIC No."),
                        react_1.default.createElement("th", null, "Name of child"),
                        react_1.default.createElement("th", null, "Birth Date of child"),
                        react_1.default.createElement("th", null, "Age of child"),
                        react_1.default.createElement("th", null, "SI / OR Number"),
                        react_1.default.createElement("th", null, "Gross Sales"),
                        react_1.default.createElement("th", null, "Discount (VAT+Disc)"),
                        react_1.default.createElement("th", null, "Net Sales")),
                    rows)))));
};
exports.printBirReportSP = printBirReportSP;
