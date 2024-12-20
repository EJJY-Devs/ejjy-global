"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimeOnly = exports.formatInPeso = exports.standardRound = exports.formatQuantity = exports.formatDateForAPI = exports.formatDateTime24Hour = exports.formatDateTime = exports.formatTime = exports.formatDate = exports.convertIntoArray = exports.formatRemoveCommas = exports.formatNumberWithCommas = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = __importDefault(require("lodash"));
const globals_1 = require("../globals");
const formatNumberWithCommas = (x) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
exports.formatNumberWithCommas = formatNumberWithCommas;
const formatRemoveCommas = (x) => { var _a; return Number(((_a = x === null || x === void 0 ? void 0 : x.toString()) === null || _a === void 0 ? void 0 : _a.replace(/,/g, '')) || ''); };
exports.formatRemoveCommas = formatRemoveCommas;
const convertIntoArray = (errors, prefixMessage = null) => {
    const prefix = prefixMessage ? `${prefixMessage}: ` : '';
    if (typeof errors === 'string') {
        return [prefix + errors];
    }
    if (Array.isArray(errors)) {
        return errors.map((error) => prefix + error);
    }
    return [];
};
exports.convertIntoArray = convertIntoArray;
const formatDate = (datetime) => dayjs_1.default.tz(datetime).format(globals_1.DATE_FORMAT_UI);
exports.formatDate = formatDate;
const formatTime = (datetime) => dayjs_1.default.tz(datetime).format(globals_1.TIME_FORMAT_UI);
exports.formatTime = formatTime;
const formatDateTime = (datetime, withTimezone = true) => {
    const dt = withTimezone ? dayjs_1.default.tz(datetime, 'GMT') : (0, dayjs_1.default)(datetime);
    return dt.format(`${globals_1.DATE_FORMAT_UI} - ${globals_1.TIME_FORMAT_UI}`);
};
exports.formatDateTime = formatDateTime;
const formatDateTime24Hour = (datetime) => dayjs_1.default.tz(datetime).format(`${globals_1.DATE_FORMAT_UI} HH:mm`);
exports.formatDateTime24Hour = formatDateTime24Hour;
const formatDateForAPI = (date) => {
    return date.format(globals_1.DATE_FORMAT_API);
};
exports.formatDateForAPI = formatDateForAPI;
const formatQuantity = (quantity, product, type = null) => {
    if ([product.unit_of_measurement, type].includes(globals_1.unitOfMeasurementTypes.WEIGHING)) {
        return Number(quantity).toFixed(3);
    }
    if ([product.unit_of_measurement, type].includes(globals_1.unitOfMeasurementTypes.NON_WEIGHING)) {
        return Number(quantity).toFixed(0);
    }
    return '';
};
exports.formatQuantity = formatQuantity;
const standardRound = (value) => lodash_1.default.round(value, 2).toFixed(2);
exports.standardRound = standardRound;
const formatInPeso = (value, pesoSign = '₱') => {
    const x = Number(value);
    return lodash_1.default.isNaN(x)
        ? globals_1.EMPTY_CELL
        : `${x < 0 ? '-' : ''}${pesoSign}${(0, exports.formatNumberWithCommas)((0, exports.standardRound)(Math.abs(x)))}`;
};
exports.formatInPeso = formatInPeso;
const formatTimeOnly = (time) => (0, dayjs_1.default)(time, 'HH:mm:ss').format(globals_1.TIME_FORMAT_UI);
exports.formatTimeOnly = formatTimeOnly;
