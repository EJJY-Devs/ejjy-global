"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printZReadReport = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const ZReadContent_1 = require("../../components/modals/ViewZReadReportModal/ZReadContent");
const helper_receipt_1 = require("../helper-receipt");
const printZReadReport = (report, siteSettings, user, isPdf = false) => {
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(ZReadContent_1.ZReadContent, { report: report, siteSettings: siteSettings, user: isPdf ? undefined : user, isForPrint: true })));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'ZRead Report');
};
exports.printZReadReport = printZReadReport;
