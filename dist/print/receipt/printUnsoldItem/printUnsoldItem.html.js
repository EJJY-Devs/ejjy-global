"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printUnsoldItemHtml = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const UnsoldItemContent_1 = require("../../../components/modals/ViewUnsoldItemModal/UnsoldItemContent");
const helper_receipt_1 = require("../../helper-receipt");
// eslint-disable-next-line react-refresh/only-export-components
const printUnsoldItemHtml = ({ unsoldItemSummary, branch, branchMachine, user, isPdf = false, reportDate, }) => {
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(UnsoldItemContent_1.UnsoldItemContent, { unsoldItemSummary: unsoldItemSummary, branch: branch, branchMachine: branchMachine, user: user, reportDate: reportDate })));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    return data;
};
exports.printUnsoldItemHtml = printUnsoldItemHtml;
