"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const react_1 = __importDefault(require("react"));
const Divider = () => (react_1.default.createElement("div", { style: {
        width: '100%',
        margin: '4px auto',
        borderBottom: '1px dashed black',
    } }));
exports.Divider = Divider;
