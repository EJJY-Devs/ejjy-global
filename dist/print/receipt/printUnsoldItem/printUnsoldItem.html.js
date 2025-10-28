"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printUnsoldItemHtml = exports.UnsoldItemContent = void 0;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const helper_receipt_1 = require("../../helper-receipt");
const UnsoldItemContent = ({ unsoldItemSummary, branch, branchMachine, reportDate, }) => (react_1.default.createElement("div", { className: "container", style: {
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: '1.4',
    } },
    react_1.default.createElement("div", null,
        react_1.default.createElement("strong", null, (branchMachine === null || branchMachine === void 0 ? void 0 : branchMachine.name) || (branch === null || branch === void 0 ? void 0 : branch.name) || 'Branch'),
        react_1.default.createElement("br", null),
        react_1.default.createElement("span", null, (branch === null || branch === void 0 ? void 0 : branch.store_address) || (branch === null || branch === void 0 ? void 0 : branch.location) || ''),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("strong", null, "UNSOLD ITEM"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("span", null, reportDate),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null)),
    unsoldItemSummary.length === 0 ? (react_1.default.createElement("div", { style: { padding: '32px 0', textAlign: 'center' } },
        react_1.default.createElement("span", null, "No unsold items today"))) : (react_1.default.createElement("table", { style: { width: '100%', borderCollapse: 'collapse' } },
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { style: {
                        textAlign: 'left',
                        padding: '4px',
                        borderBottom: '1px solid #000',
                    } }, "Name"),
                react_1.default.createElement("th", { style: {
                        textAlign: 'center',
                        padding: '4px',
                        borderBottom: '1px solid #000',
                    } }, "Quantity"))),
        react_1.default.createElement("tbody", null, unsoldItemSummary.map((item, index) => (react_1.default.createElement("tr", { key: `${item.name}-${index}` },
            react_1.default.createElement("td", { style: { padding: '2px 4px' } }, item.name),
            react_1.default.createElement("td", { style: { textAlign: 'center', padding: '2px 4px' } }, item.quantity.toLocaleString()))))))),
    react_1.default.createElement("br", null),
    react_1.default.createElement("span", null,
        "PDT:",
        ' ',
        new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })),
    react_1.default.createElement("br", null),
    react_1.default.createElement("br", null)));
exports.UnsoldItemContent = UnsoldItemContent;
// eslint-disable-next-line react-refresh/only-export-components
const printUnsoldItemHtml = ({ unsoldItemSummary, branch, branchMachine, user, isPdf = false, reportDate, }) => {
    const data = server_1.default.renderToStaticMarkup(react_1.default.createElement("div", { className: "container", style: (0, helper_receipt_1.getPageStyleObject)() },
        react_1.default.createElement(exports.UnsoldItemContent, { unsoldItemSummary: unsoldItemSummary, branch: branch, branchMachine: branchMachine, user: user, reportDate: reportDate })));
    if (isPdf) {
        return (0, helper_receipt_1.appendHtmlElement)(data);
    }
    (0, helper_receipt_1.print)(data, 'Unsold Item Summary');
};
exports.printUnsoldItemHtml = printUnsoldItemHtml;
