"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBirReportPWD = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const birReportHelper_1 = require("./birReportHelper");
const printBirReportPWD = (transactions, siteSettings, user, branchMachine) => {
    const rows = transactions.map((transaction) => (react_1.default.createElement("tr", null,
        react_1.default.createElement("td", null, (0, utils_1.formatDate)(transaction.datetime_created)),
        react_1.default.createElement("td", null, "Mark Angeles"),
        react_1.default.createElement("td", null, "14524-15"),
        react_1.default.createElement("td", null, "123-123-123"),
        react_1.default.createElement("td", null, transaction.invoice.or_number),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.overall_discount, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN)))));
    return server_1.default.renderToStaticMarkup(react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null, birReportHelper_1.birReportStyles),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { className: "bir-reports-pdf" },
                react_1.default.createElement("div", { className: "details" }, siteSettings.proprietor),
                react_1.default.createElement("div", { className: "details" }, siteSettings.address_of_tax_payer),
                react_1.default.createElement("div", { className: "details" }, siteSettings.tin),
                react_1.default.createElement("br", null),
                react_1.default.createElement("div", { className: "details" }, "V1.0 (Static)"),
                react_1.default.createElement("div", { className: "details" }, branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.pos_terminal),
                react_1.default.createElement("div", { className: "details" }, branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.name),
                react_1.default.createElement("div", { className: "details" }, (0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)),
                react_1.default.createElement("div", { className: "details" }, user.employee_id),
                react_1.default.createElement("br", null),
                react_1.default.createElement("h4", { className: "title" }, "Persons with Disability Sales Book/Report"),
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
