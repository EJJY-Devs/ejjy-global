"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useOrderOfPayments = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)([
        'useOrderOfPayments',
        params === null || params === void 0 ? void 0 : params.isPending,
        params === null || params === void 0 ? void 0 : params.page,
        params === null || params === void 0 ? void 0 : params.pageSize,
        params === null || params === void 0 ? void 0 : params.payorId,
        params === null || params === void 0 ? void 0 : params.timeRange,
    ], () => (0, helper_1.wrapServiceWithCatch)(services_1.OrderOfPaymentsService.list({
        is_pending: params === null || params === void 0 ? void 0 : params.isPending,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        payor_id: params === null || params === void 0 ? void 0 : params.payorId,
        time_range: (params === null || params === void 0 ? void 0 : params.timeRange) || globals_1.timeRangeTypes.DAILY,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
exports.default = useOrderOfPayments;
