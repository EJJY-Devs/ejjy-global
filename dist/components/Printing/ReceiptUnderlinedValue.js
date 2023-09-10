"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptUnderlinedValue = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
const ReceiptUnderlinedValue = ({ value, prefix, postfix }) => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement("span", { style: { display: 'inline-block' } },
        prefix,
        (0, utils_1.formatInPeso)(value),
        postfix),
    Number(value) > 0 && (react_1.default.createElement("div", { className: "w-100", style: { textAlign: 'right', lineHeight: 0.2 } }, "-----------"))));
exports.ReceiptUnderlinedValue = ReceiptUnderlinedValue;
