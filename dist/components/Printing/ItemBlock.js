"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemBlock = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const ReceiptUnderlinedValue_1 = require("./ReceiptUnderlinedValue");
const ItemBlock = ({ items }) => {
    return (react_1.default.createElement(antd_1.Descriptions, { className: "w-full", colon: false, column: 1, contentStyle: { textAlign: 'right', display: 'block' }, labelStyle: { width: 200 }, size: "small" }, items.map((item) => (react_1.default.createElement(antd_1.Descriptions.Item, { key: item.label, label: item.label, labelStyle: Object.assign({ paddingLeft: item.isIndented ? 30 : 0 }, item.labelStyle), contentStyle: item.contentStyle },
        item.isParenthesized ? '(' : ' ',
        item.isUnderlined ? (react_1.default.createElement(ReceiptUnderlinedValue_1.ReceiptUnderlinedValue, { value: item.value })) : (item.value),
        item.isParenthesized ? ')' : ' ')))));
};
exports.ItemBlock = ItemBlock;
