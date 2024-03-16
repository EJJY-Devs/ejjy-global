"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBirReport = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const birReportHelper_1 = require("./birReportHelper");
const printBirReport = (birReports, siteSettings, user, branchMachine) => {
    const rows = birReports.map((report) => {
        var _a, _b;
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("td", null, (0, utils_1.formatDate)(report.date)),
            react_1.default.createElement("td", null, ((_a = report === null || report === void 0 ? void 0 : report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number) || helper_receipt_1.EMPTY_CELL),
            react_1.default.createElement("td", null, ((_b = report === null || report === void 0 ? void 0 : report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number) || helper_receipt_1.EMPTY_CELL),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.grand_accumulated_sales_ending_balance, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.grand_accumulated_sales_beginning_balance, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.gross_sales_for_the_day, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.sales_issue_with_manual, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.gross_sales_from_pos, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.vatable_sales, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.vat_exempt_sales, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.zero_rated_sales, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.regular_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.special_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.returns, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.void, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.total_deductions, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.vat_on_special_discounts, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.vat_on_returns, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.others, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.vat_payable, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.net_sales, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.other_income, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.sales_overrun_or_overflow, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(report.total_net_sales, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, report.reset_counter),
            react_1.default.createElement("td", null, report.remarks)));
    });
    return server_1.default.renderToStaticMarkup(react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null, birReportHelper_1.birReportStyles),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { className: "bir-reports-pdf" },
                react_1.default.createElement(birReportHelper_1.BirHeader, { branchMachine: branchMachine, siteSettings: siteSettings, user: user, title: "BIR SALES SUMMARY REPORT" }),
                react_1.default.createElement("table", { className: "bir-reports" },
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", { rowSpan: 2 }, "Date"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Beginning SI/OR No."),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Ending SI/OR No. "),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Grand Accum. Sales Ending Balance"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Grand Accum. Sales Beginning Balance"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Gross Sales for the Day"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Sales Issued with Manual SI/OR (per RR 16-2018)"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Gross Sales From POS"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "VATable Sales"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "VAT Amount (12%)"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "VAT-Exempt Sales"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Zero Rated Sales"),
                        react_1.default.createElement("th", { colSpan: 5 }, "Deductions"),
                        react_1.default.createElement("th", { colSpan: 4 }, "Adjustments on VAT"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "VAT Payable"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Net Sales"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Other Income"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Sales Overrun/ Overflow"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Total Net Sales"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Reset Counter"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Remarks")),
                    react_1.default.createElement("tr", { className: "nested-row", style: { fontWeight: 'bold' } },
                        react_1.default.createElement("td", null, "Regular Discount"),
                        react_1.default.createElement("td", null, "Special Discount"),
                        react_1.default.createElement("td", null, "Returns"),
                        react_1.default.createElement("td", null, "Void"),
                        react_1.default.createElement("td", null, "Total Deductions"),
                        react_1.default.createElement("td", null, "VAT on Specials"),
                        react_1.default.createElement("td", null, "VAT on Returns"),
                        react_1.default.createElement("td", null, "Others "),
                        react_1.default.createElement("td", null, "Total VAT Adj.")),
                    rows)))));
};
exports.printBirReport = printBirReport;
