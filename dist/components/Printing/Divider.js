"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const react_1 = __importDefault(require("react"));
const Divider = () => (react_1.default.createElement("div", { className: 'mx-auto my-2 border-dashed border-black border-b-[1px] w-[80%]' }));
exports.Divider = Divider;
