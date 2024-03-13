"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
const Divider = ({ className }) => (react_1.default.createElement("div", { className: (0, utils_1.cn)('mt-6 mb-6 border-b-[1px] border-dashed border-black', className) }));
exports.Divider = Divider;
