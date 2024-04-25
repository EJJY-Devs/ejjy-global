"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintDetails = void 0;
const react_1 = __importDefault(require("react"));
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("../../utils");
const PrintDetails = ({ user }) => (react_1.default.createElement("div", null,
    "PDT: ",
    user && `${(0, utils_1.formatDateTime)((0, dayjs_1.default)(), false)} - ${user === null || user === void 0 ? void 0 : user.employee_id}`));
exports.PrintDetails = PrintDetails;
