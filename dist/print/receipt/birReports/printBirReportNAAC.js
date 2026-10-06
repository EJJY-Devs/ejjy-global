"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBirReportNAAC = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const utils_1 = require("../../../utils");
const birReportHelper_1 = require("./birReportHelper");
const printBirReportNAAC = (transactions, siteSettings, user, branchMachine) => {
    const rows = (0, birReportHelper_1.getBirNaacRows)(transactions).map((row) => (react_1.default.createElement("tr", null,
        react_1.default.createElement("td", null, (0, utils_1.formatDate)(row.date)),
        react_1.default.createElement("td", null, row.coach),
        react_1.default.createElement("td", null, row.id),
        react_1.default.createElement("td", null, row.orNumber),
        react_1.default.createElement("td", null, (0, birReportHelper_1.formatPesoCell)(row.grossSales)),
        react_1.default.createElement("td", null, (0, birReportHelper_1.formatPesoCell)(row.discount)),
        react_1.default.createElement("td", null, (0, birReportHelper_1.formatPesoCell)(row.netSales)))));
    return server_1.default.renderToStaticMarkup(react_1.default.createElement("html", { lang: "en" },
        react_1.default.createElement("head", null, (0, birReportHelper_1.birReportStyles)('compact')),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { className: "bir-reports-pdf", style: { width: '100%' } },
                react_1.default.createElement(birReportHelper_1.BirHeader, { branchMachine: branchMachine, siteSettings: siteSettings, user: user, title: birReportHelper_1.BIR_REPORT_TITLES.NAAC }),
                react_1.default.createElement("table", { className: "bir-reports" },
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "Date"),
                        react_1.default.createElement("th", null, "Name of National Athlete/Coach"),
                        react_1.default.createElement("th", null, "PNSTM ID No.."),
                        react_1.default.createElement("th", null, "SI / OR Number"),
                        react_1.default.createElement("th", null, "Gross Sales/Receipts"),
                        react_1.default.createElement("th", null, "Sales Discount (VAT+Disc)"),
                        react_1.default.createElement("th", null, "Net Sales")),
                    rows)))));
};
exports.printBirReportNAAC = printBirReportNAAC;
