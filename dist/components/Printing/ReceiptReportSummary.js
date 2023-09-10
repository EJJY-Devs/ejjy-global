"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptReportSummary = void 0;
const react_1 = __importDefault(require("react"));
const ReceiptReportSummary = ({ data }) => (react_1.default.createElement("table", { style: { marginLeft: '50px' } }, data.map((d) => (react_1.default.createElement("tr", { key: d.value },
    react_1.default.createElement("td", { style: { width: '100px' } },
        d.label,
        ":"),
    react_1.default.createElement("td", { style: { textAlign: 'right' } }, d.value))))));
exports.ReceiptReportSummary = ReceiptReportSummary;
