"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelButton = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const ExcelButton = ({ downloadExcel, isDisabled, isLoading, }) => (react_1.default.createElement(antd_1.Button, { className: "ml-2", disabled: isDisabled, icon: react_1.default.createElement(icons_1.FileExcelOutlined, null), loading: isLoading, type: "primary", onClick: downloadExcel }, "Excel"));
exports.ExcelButton = ExcelButton;
