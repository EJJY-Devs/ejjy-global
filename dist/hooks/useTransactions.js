"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransactionComputeDiscount = exports.useTransactionRetrieve = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useTransactions = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useTransactions', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.TransactionsService.list({
        is_adjusted: params === null || params === void 0 ? void 0 : params.isAdjusted,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.MAX_PAGE_SIZE,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        statuses: params === null || params === void 0 ? void 0 : params.statuses,
        teller_id: params === null || params === void 0 ? void 0 : params.tellerId,
        time_range: (params === null || params === void 0 ? void 0 : params.timeRange) || globals_1.timeRangeTypes.DAILY,
    })), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useTransactionRetrieve = (data) => {
    const { id, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useTransactionRetrieve', id], () => services_1.TransactionsService.retrieve(id, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL), Object.assign({ enabled: typeof id === 'number' }, options));
};
exports.useTransactionRetrieve = useTransactionRetrieve;
const useTransactionComputeDiscount = () => (0, react_query_1.useMutation)(({ branchProducts, discountAmount, discountOptionId }) => services_1.TransactionsService.compute({
    branch_products: branchProducts,
    discount_amount: discountAmount,
    discount_option_id: discountOptionId,
}));
exports.useTransactionComputeDiscount = useTransactionComputeDiscount;
exports.default = useTransactions;
