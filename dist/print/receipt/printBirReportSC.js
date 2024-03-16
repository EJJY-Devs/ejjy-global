"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBirReportSC = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
const helper_receipt_1 = require("../helper-receipt");
const server_1 = __importDefault(require("react-dom/server"));
const printBirReportSC = (transactions, siteSettings, user, branchMachine) => {
    const birReportsRow = transactions.map((transaction) => (react_1.default.createElement("tr", null,
        react_1.default.createElement("td", null, (0, utils_1.formatDate)(transaction.datetime_created)),
        react_1.default.createElement("td", null, "Manuel Ramirez"),
        react_1.default.createElement("td", null, "14524-15"),
        react_1.default.createElement("td", null, "123-123-123"),
        react_1.default.createElement("td", null, "00-0123456789"),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.total_amount, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_amount, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_exempt, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(0, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.overall_discount, helper_receipt_1.PESO_SIGN)),
        react_1.default.createElement("td", null, (0, utils_1.formatInPeso)(transaction.invoice.vat_sales, helper_receipt_1.PESO_SIGN)))));
    const styles = `
    <style>
      body .bir-reports-pdf {
        font-family: 'Tahoma', monospace;
        font-size: 12px;
      }

      table.bir-reports,
      div.details,
      .title {
        width: 1780px;
      }

      table.bir-reports {
        border-collapse: collapse;
      }

      table.bir-reports th,
      table.bir-reports .nested-row td {
        min-width: 60px;
        line-height: 100%;
      }

      table.bir-reports th[colspan] {
        background-color: #ADB9CA;
      }

      table.bir-reports th[rowspan],
      table.bir-reports .nested-row td {
        background-color: #BDD6EE;
      }

      table.bir-reports th,
      table.bir-reports td {
        border: 1px solid black;
        text-align: center;
      }

      .title {
        text-align: center;
        font-weight: bold;
      }
    </style>`;
    return server_1.default.renderToStaticMarkup(react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null, styles),
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
                react_1.default.createElement("h4", { className: "title" }, "Senior Citizen Sales Book/ Report"),
                react_1.default.createElement("table", { className: "bir-reports" },
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", { rowSpan: 2 }, "Date"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Name of Senior Citizen (SC)"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "OSCA ID No./ SC ID No."),
                        react_1.default.createElement("th", { rowSpan: 2 }, "SC TIN"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "SI / OR Number"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Sales (inclusive of VAT)"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "VAT Amount"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "VAT Exempt Sales"),
                        react_1.default.createElement("th", { colSpan: 2 }, "Deductions"),
                        react_1.default.createElement("th", { rowSpan: 2 }, "Net Sales")),
                    react_1.default.createElement("tr", { className: "nested-row", style: { fontWeight: 'bold' } },
                        react_1.default.createElement("td", null, "5%"),
                        react_1.default.createElement("td", null, "20%")),
                    "$",
                    birReportsRow)))));
};
exports.printBirReportSC = printBirReportSC;
