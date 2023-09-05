"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatInPeso = exports.standardRound = exports.formatQuantity = exports.formatDateForAPI = exports.formatDateTime24Hour = exports.formatDateTime = exports.formatDate = exports.convertIntoArray = exports.formatRemoveCommas = exports.formatNumberWithCommas = void 0;
const constants_1 = require("constants");
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = __importDefault(require("lodash"));
const formatNumberWithCommas = (x) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
exports.formatNumberWithCommas = formatNumberWithCommas;
const formatRemoveCommas = (x) => { var _a; return Number(((_a = x === null || x === void 0 ? void 0 : x.toString()) === null || _a === void 0 ? void 0 : _a.replace(/,/g, "")) || ""); };
exports.formatRemoveCommas = formatRemoveCommas;
const convertIntoArray = (errors, prefixMessage = null) => {
    const prefix = prefixMessage ? `${prefixMessage}: ` : "";
    if (typeof errors === "string") {
        return [prefix + errors];
    }
    if (Array.isArray(errors)) {
        return errors.map((error) => prefix + error);
    }
    return [];
};
exports.convertIntoArray = convertIntoArray;
const formatDate = (datetime) => dayjs_1.default.tz(datetime).format(constants_1.DATE_FORMAT);
exports.formatDate = formatDate;
const formatDateTime = (datetime, withTimezone = true) => {
    const dt = withTimezone ? dayjs_1.default.tz(datetime, "GMT") : (0, dayjs_1.default)(datetime);
    return dt.format(`${constants_1.DATE_FORMAT} h:mmA`);
};
exports.formatDateTime = formatDateTime;
const formatDateTime24Hour = (datetime) => dayjs_1.default.tz(datetime).format(`${constants_1.DATE_FORMAT} HH:mm`);
exports.formatDateTime24Hour = formatDateTime24Hour;
const formatDateForAPI = (date) => {
    return date.format("YYYY-MM-DD");
};
exports.formatDateForAPI = formatDateForAPI;
const formatQuantity = (quantity, product, type = null) => {
    if ([product.unit_of_measurement, type].includes(constants_1.unitOfMeasurementTypes.WEIGHING)) {
        return Number(quantity).toFixed(3);
    }
    if (product.unit_of_measurement === constants_1.unitOfMeasurementTypes.NON_WEIGHING) {
        return Number(quantity).toFixed(0);
    }
    return 0;
};
exports.formatQuantity = formatQuantity;
const standardRound = (value) => lodash_1.default.round(value, 2).toFixed(2);
exports.standardRound = standardRound;
const formatInPeso = (value, pesoSign = "₱") => {
    const x = Number(value);
    return lodash_1.default.isNaN(x)
        ? constants_1.EMPTY_CELL
        : `${x < 0 ? "-" : ""}${pesoSign}${(0, exports.formatNumberWithCommas)(Number((0, exports.standardRound)(Math.abs(x))))}`;
};
exports.formatInPeso = formatInPeso;
