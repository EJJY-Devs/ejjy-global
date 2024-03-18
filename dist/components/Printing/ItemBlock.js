"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemBlock = void 0;
const react_1 = __importDefault(require("react"));
const helper_receipt_1 = require("../../print/helper-receipt");
const utils_1 = require("../../utils");
const ItemBlock = ({ items }) => (react_1.default.createElement("table", { style: { width: '100%' } }, items.map((item) => (react_1.default.createElement("tr", null,
    react_1.default.createElement("td", { style: Object.assign({ paddingLeft: item.isIndented ? 15 : 0 }, item.labelStyle) }, item.label),
    react_1.default.createElement("td", { style: Object.assign({ textAlign: 'right' }, item.contentStyle) },
        item.isParenthesized ? '(' : ' ',
        item.isUnderlined ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { display: 'inline-block' } }, (0, utils_1.formatInPeso)(item.value, helper_receipt_1.PESO_SIGN)),
            Number(item.value) > 0 && (react_1.default.createElement("div", { style: { width: '100%', textAlign: 'right' } }, "-----------")))) : (item.value),
        item.isParenthesized ? ')' : ' '))))));
exports.ItemBlock = ItemBlock;
