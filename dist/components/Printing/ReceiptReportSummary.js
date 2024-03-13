"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptReportSummary = void 0;
const react_1 = __importDefault(require("react"));
const ReceiptReportSummary = ({ data }) => (react_1.default.createElement("table", { className: "ml-12" }, data.map((d) => (react_1.default.createElement("tr", { key: d.value },
    react_1.default.createElement("td", { className: "w-[100px]" },
        d.label,
        ":"),
    react_1.default.createElement("td", { className: "text-right" }, d.value))))));
exports.ReceiptReportSummary = ReceiptReportSummary;
