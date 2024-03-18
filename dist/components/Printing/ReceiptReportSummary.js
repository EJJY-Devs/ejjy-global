"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptReportSummary = void 0;
const react_1 = __importDefault(require("react"));
const ReceiptReportSummary = ({ items }) => (react_1.default.createElement("table", { style: { marginLeft: 15 } }, items.map((item) => (react_1.default.createElement("tr", { key: item.value },
    react_1.default.createElement("td", { style: { width: 120 } },
        item.label,
        ":"),
    react_1.default.createElement("td", { style: { textAlign: 'right' } }, item.value))))));
exports.ReceiptReportSummary = ReceiptReportSummary;
