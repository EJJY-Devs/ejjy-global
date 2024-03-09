"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountDisplay = void 0;
const antd_1 = require("antd");
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
const DiscountDisplay = ({ discountOption, overallDiscount }) => {
    return (react_1.default.createElement(antd_1.Descriptions, { column: 1, size: "small", bordered: true },
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Name" }, discountOption.name),
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Type" },
            lodash_1.default.upperFirst(discountOption.type),
            ' ',
            Number(discountOption.percentage) > 0
                ? `${discountOption.percentage}%`
                : ''),
        react_1.default.createElement(antd_1.Descriptions.Item, { label: "Amount" }, (0, utils_1.formatInPeso)(overallDiscount))));
};
exports.DiscountDisplay = DiscountDisplay;
