"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printXReadReportHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const XReadContent_1 = require("../../../components/modals/ViewXReadReportModal/XReadContent");
const helper_receipt_1 = require("../../helper-receipt");
const printXReadReportHtml = ({ report, siteSettings, user, isPdf = false, }) => {
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(XReadContent_1.XReadContent, { report: report, siteSettings: siteSettings, user: user, isForPrint: true })));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'XRead Report');
};
exports.printXReadReportHtml = printXReadReportHtml;
