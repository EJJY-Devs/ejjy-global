"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBirReportPWD = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const utils_1 = require("../../../utils");
const birReportHelper_1 = require("./birReportHelper");
const printBirReportPWD = (transactions, siteSettings, user, branchMachine) => {
    const rows = (0, birReportHelper_1.getBirPwdRows)(transactions).map((row) => (react_1.default.createElement("tr", null,
        react_1.default.createElement("td", null, (0, utils_1.formatDate)(row.date)),
        react_1.default.createElement("td", null, row.name),
        react_1.default.createElement("td", null, row.id),
        react_1.default.createElement("td", null, row.tin),
        react_1.default.createElement("td", null, row.orNumber),
        react_1.default.createElement("td", null, (0, birReportHelper_1.formatPesoCell)(row.sales)),
        react_1.default.createElement("td", null, (0, birReportHelper_1.formatPesoCell)(row.vatAmount)),
        react_1.default.createElement("td", null, (0, birReportHelper_1.formatPesoCell)(row.vatExempt)),
        react_1.default.createElement("td", null, (0, birReportHelper_1.formatPesoCell)(row.deduction5Percent)),
        react_1.default.createElement("td", null, (0, birReportHelper_1.formatPesoCell)(row.deduction20Percent)),
        react_1.default.createElement("td", null, (0, birReportHelper_1.formatPesoCell)(row.netSales)))));
    return server_1.default.renderToStaticMarkup(react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null, (0, birReportHelper_1.birReportStyles)('compact')),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { className: "bir-reports-pdf", style: { width: '100%' } },
                react_1.default.createElement(birReportHelper_1.BirHeader, { branchMachine: branchMachine, siteSettings: siteSettings, user: user, title: birReportHelper_1.BIR_REPORT_TITLES.PWD }),
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
