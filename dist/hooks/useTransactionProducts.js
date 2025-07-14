"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransactionProducts = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useTransactionProducts = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)([
        'useTransactionProducts',
        params === null || params === void 0 ? void 0 : params.isVatExempted,
        params === null || params === void 0 ? void 0 : params.orNumber,
        params === null || params === void 0 ? void 0 : params.page,
        params === null || params === void 0 ? void 0 : params.pageSize,
        params === null || params === void 0 ? void 0 : params.statuses,
        params === null || params === void 0 ? void 0 : params.timeRange,
        params === null || params === void 0 ? void 0 : params.branchId,
    ], () => (0, helper_1.wrapServiceWithCatch)(services_1.TransactionProductsService.list({
        is_vat_exempted: params === null || params === void 0 ? void 0 : params.isVatExempted,
        or_number: params === null || params === void 0 ? void 0 : params.orNumber,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        statuses: params === null || params === void 0 ? void 0 : params.statuses,
        time_range: (params === null || params === void 0 ? void 0 : params.timeRange) || globals_1.timeRangeTypes.DAILY,
        branch_id: params === null || params === void 0 ? void 0 : params.branchId,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
exports.useTransactionProducts = useTransactionProducts;
exports.default = exports.useTransactionProducts;
