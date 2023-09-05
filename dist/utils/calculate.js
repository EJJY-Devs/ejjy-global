"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComputedDiscount = exports.calculateCashBreakdownTotal = exports.countDecimals = exports.calculateTableHeight = void 0;
const globals_1 = require("globals");
const calculateTableHeight = (listLength) => {
    const MAX_ROW_COUNT = 6;
    return (globals_1.ROW_HEIGHT * (listLength <= MAX_ROW_COUNT ? listLength : MAX_ROW_COUNT));
};
exports.calculateTableHeight = calculateTableHeight;
const countDecimals = (value) => {
    if (Math.floor(value) === value)
        return 0;
    return value.toString().split(".")[1].length || 0;
};
exports.countDecimals = countDecimals;
const calculateCashBreakdownTotal = (cashBreakdown) => 0.25 * cashBreakdown.coins_25 +
    1 * cashBreakdown.coins_1 +
    5 * cashBreakdown.coins_5 +
    10 * cashBreakdown.coins_10 +
    20 * cashBreakdown.coins_20 +
    20 * cashBreakdown.bills_20 +
    50 * cashBreakdown.bills_50 +
    100 * cashBreakdown.bills_100 +
    200 * cashBreakdown.bills_200 +
    500 * cashBreakdown.bills_500 +
    1000 * cashBreakdown.bills_1000;
exports.calculateCashBreakdownTotal = calculateCashBreakdownTotal;
// TODO: Remove once already implemented in backend
const getComputedDiscount = (transaction) => {
    return transaction.discount_option.is_special_discount
        ? Number(transaction.overall_discount) -
            Number(transaction.invoice.vat_amount)
        : transaction.overall_discount;
};
exports.getComputedDiscount = getComputedDiscount;
