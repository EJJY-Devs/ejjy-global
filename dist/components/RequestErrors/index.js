"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestErrors = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const elements_1 = require("../elements");
const RequestErrors = ({ className, errors, withSpaceTop, withSpaceBottom, }) => {
    var _a;
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)('w-full flex flex-col', className, {
            'mt-4': withSpaceTop,
            'mb-4': withSpaceBottom,
        }) }, (_a = errors === null || errors === void 0 ? void 0 : errors.filter(Boolean)) === null || _a === void 0 ? void 0 : _a.map((error, index) => (react_1.default.createElement(elements_1.FieldError, { key: index, error: error })))));
};
exports.RequestErrors = RequestErrors;
