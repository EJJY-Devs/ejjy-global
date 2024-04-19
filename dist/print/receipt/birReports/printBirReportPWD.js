"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBirReportPWD = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const birReportHelper_1 = require("./birReportHelper");
const globals_1 = require("../../../globals");
const printBirReportPWD = (transactions, siteSettings, user, branchMachine) => {
    const rows = transactions.map((transaction) => {
        const fields = (0, utils_1.getDiscountFields)(globals_1.specialDiscountCodes.PERSONS_WITH_DISABILITY, transaction.discount_option_additional_fields_values || '');
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("td", null, (0, utils_1.formatDate)(transaction.datetime_created)),
            react_1.default.createElement("td", null, fields.name),
            react_1.default.createElement("td", null, fields.id),
            react_1.default.createElement("td", null, fields.tin),
            react_1.default.createElement("td", null, transaction.invoice.or_number),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.overall_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN))));
    });
    return server_1.default.renderToStaticMarkup(react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null, birReportHelper_1.birReportStyles),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { className: "bir-reports-pdf" },
                react_1.default.createElement(birReportHelper_1.BirHeader, { branchMachine: branchMachine, siteSettings: siteSettings, user: user, title: "Persons with Disability Sales Book/Report" }),
                react_1.default.createElement("table", { className: "bir-reports" },
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", { rowSpan: 2 }, "Date"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Name of Person with Disability (PWD)"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "PWD ID No."),
                        react_1.default.createElement("th", { rowSpan: 2 }, "PWD TIN"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "SI / OR Number"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Sales (inclusive of VAT)"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "VAT Amount"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "VAT Exempt Sales"),
                        react_1.default.createElement("th", { colSpan: 2 }, "Deductions"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Net Sales")),
                    react_1.default.createElement("tr", { className: "nested-row", style: { fontWeight: 'bold' } },
                        react_1.default.createElement("td", null, "5%"),
                        react_1.default.createElement("td", null, "20%")),
                    rows)))));
};
exports.printBirReportPWD = printBirReportPWD;
