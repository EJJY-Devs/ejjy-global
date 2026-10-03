"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComputedDiscount = exports.calculateCashBreakdownTotal = exports.getCashInDrawerTotals = exports.getCashBreakdownTotals = exports.CASH_BREAKDOWN_BILLS = exports.CASH_BREAKDOWN_COINS = exports.countDecimals = exports.calculateTableHeight = void 0;
const globals_1 = require("../globals");
const calculateTableHeight = (listLength) => {
    const MAX_ROW_COUNT = 6;
    return (globals_1.ROW_HEIGHT * (listLength <= MAX_ROW_COUNT ? listLength : MAX_ROW_COUNT));
};
exports.calculateTableHeight = calculateTableHeight;
const countDecimals = (value) => {
    if (Math.floor(value) === value)
        return 0;
    return value.toString().split('.')[1].length || 0;
};
exports.countDecimals = countDecimals;
exports.CASH_BREAKDOWN_COINS = [
    { key: 'coins_25', value: 0.25 },
    { key: 'coins_1', value: 1 },
    { key: 'coins_5', value: 5 },
    { key: 'coins_10', value: 10 },
    { key: 'coins_20', value: 20 },
];
exports.CASH_BREAKDOWN_BILLS = [
    { key: 'bills_20', value: 20 },
    { key: 'bills_50', value: 50 },
    { key: 'bills_100', value: 100 },
    { key: 'bills_200', value: 200 },
    { key: 'bills_500', value: 500 },
    { key: 'bills_1000', value: 1000 },
];
const sumDenominations = (cashBreakdown, denominations) => 
// Work in centavos to avoid floating point drift (e.g. 0.25 x 3)
denominations.reduce((sum, { key, value }) => sum + Math.round(value * 100) * (Number(cashBreakdown[key]) || 0), 0) / 100;
// Computed from the denomination counts (not total_amount) so print-only
// data and saved records always agree.
const getCashBreakdownTotals = (cashBreakdown) => {
    const coinsTotal = sumDenominations(cashBreakdown, exports.CASH_BREAKDOWN_COINS);
    const billsTotal = sumDenominations(cashBreakdown, exports.CASH_BREAKDOWN_BILLS);
    return { coinsTotal, billsTotal, total: coinsTotal + billsTotal };
};
exports.getCashBreakdownTotals = getCashBreakdownTotals;
// Cash in Drawer extras: either the summary (e-payments + others) or the
// plain total_e_payments/total_others/total_remittance fields on the cash breakdown.
const getCashInDrawerTotals = (cashBreakdown, cashTotal, summary) => {
    var _a, _b;
    if (summary) {
        return {
            ePayments: summary.ePayments,
            others: summary.others,
            remittance: cashTotal + summary.ePayments + summary.others,
        };
    }
    if (cashBreakdown.total_e_payments === undefined) {
        return undefined;
    }
    return {
        ePayments: cashBreakdown.total_e_payments,
        others: cashBreakdown.total_others,
        remittance: (_a = cashBreakdown.total_remittance) !== null && _a !== void 0 ? _a : cashTotal +
            cashBreakdown.total_e_payments +
            ((_b = cashBreakdown.total_others) !== null && _b !== void 0 ? _b : 0),
    };
};
exports.getCashInDrawerTotals = getCashInDrawerTotals;
const calculateCashBreakdownTotal = (cashBreakdown) => (0, exports.getCashBreakdownTotals)(cashBreakdown).total;
exports.calculateCashBreakdownTotal = calculateCashBreakdownTotal;
// TODO: Remove once already implemented in backend
const getComputedDiscount = (transaction) => {
    return transaction.discount_option.is_special_discount
        ? Number(transaction.overall_discount) -
            Number(transaction.invoice.vat_amount)
        : Number(transaction.overall_discount);
};
exports.getComputedDiscount = getComputedDiscount;
