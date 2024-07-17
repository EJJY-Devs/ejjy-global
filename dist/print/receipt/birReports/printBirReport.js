"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBirReport = exports.NO_TRANSACTION_REMARK = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const utils_1 = require("../../../utils");
const helper_receipt_1 = require("../../helper-receipt");
const birReportHelper_1 = require("./birReportHelper");
exports.NO_TRANSACTION_REMARK = 'No transaction';
const printBirReport = (birReports, siteSettings, user, branchMachine) => {
    const rows = birReports.map((report) => {
        var _a, _b;
        const hasNoTransaction = Number(report.gross_sales_for_the_day) === 0;
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("td", null, (0, utils_1.formatDate)(report.date)),
            react_1.default.createElement("td", null, hasNoTransaction ? helper_receipt_1.EMPTY_CELL : (_a = report === null || report === void 0 ? void 0 : report.beginning_or) === null || _a === void 0 ? void 0 : _a.or_number),
            react_1.default.createElement("td", null, hasNoTransaction ? helper_receipt_1.EMPTY_CELL : (_b = report === null || report === void 0 ? void 0 : report.ending_or) === null || _b === void 0 ? void 0 : _b.or_number),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.grand_accumulated_sales_ending_balance, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.grand_accumulated_sales_beginning_balance, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.sales_issue_with_manual, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.gross_sales_for_the_day, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.vatable_sales, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.vat_amount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.vat_exempt_sales, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.zero_rated_sales, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.sc_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.pwd_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.naac_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.sp_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.others_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.returns, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction ? helper_receipt_1.EMPTY_CELL : (0, utils_1.formatInPeso)(report.void, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.total_deductions, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.vat_sc_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.vat_pwd_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.vat_others_discount, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.vat_returns, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.vat_others, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.total_vat_adjusted, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.vat_payable, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.net_sales, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.sales_overrun_or_overflow, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction
                ? helper_receipt_1.EMPTY_CELL
                : (0, utils_1.formatInPeso)(report.total_income, helper_receipt_1.PESO_SIGN)),
            react_1.default.createElement("td", null, hasNoTransaction ? helper_receipt_1.EMPTY_CELL : report.reset_counter),
            react_1.default.createElement("td", null, hasNoTransaction ? helper_receipt_1.EMPTY_CELL : report.z_counter),
            react_1.default.createElement("td", null, hasNoTransaction ? exports.NO_TRANSACTION_REMARK : report.remarks)));
    });
    return server_1.default.renderToStaticMarkup(react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null, birReportHelper_1.birReportStyles),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { className: "bir-reports-pdf" },
                react_1.default.createElement(birReportHelper_1.BirHeader, { branchMachine: branchMachine, siteSettings: siteSettings, user: user, title: "BIR SALES SUMMARY REPORT" }),
                react_1.default.createElement("table", { className: "bir-reports" },
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", { rowSpan: 3 }, "Date"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Beginning SI/OR No."),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Ending SI/OR No."),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Grand Accum. Sales Ending Balance"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Grand Accum. Sales Beg. Balance"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Sales Issued w/ Manual SI/OR (per RR 16-2018)"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Gross Sales of the Day"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "VATable Sales"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "VAT Amount"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "VAT-Exempt Sales"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Zero Rated Sales"),
                        react_1.default.createElement("th", { colSpan: 8 }, "Deductions"),
                        react_1.default.createElement("th", { colSpan: 6 }, "Adjustments on VAT"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "VAT Payable"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Net Sales"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Sales Overrun/Overflow"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Total Income"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Reset Counter"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Z-Counter"),
                        react_1.default.createElement("th", { rowSpan: 3 }, "Remarks")),
                    react_1.default.createElement("tr", { className: "nested-row" },
                        react_1.default.createElement("th", { colSpan: 5 }, "Discount"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Returns"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Void"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Total Deductions"),
                        react_1.default.createElement("th", { colSpan: 3 }, "Discount"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "VAT on Returns"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Others"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Total VAT Adjustment")),
                    react_1.default.createElement("tr", { className: "nested-row" },
                        react_1.default.createElement("td", null, "SC"),
                        react_1.default.createElement("td", null, "PWD"),
                        react_1.default.createElement("td", null, "NAAC"),
                        react_1.default.createElement("td", null, "Solo Parent"),
                        react_1.default.createElement("td", null, "Others"),
                        react_1.default.createElement("td", null, "SC"),
                        react_1.default.createElement("td", null, "PWD"),
                        react_1.default.createElement("td", null, "Others")),
                    rows)))));
};
exports.printBirReport = printBirReport;
