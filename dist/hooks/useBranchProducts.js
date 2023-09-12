"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBranchProductsOffline = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useBranchProductsOffline = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useBranchProductsOffline', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.BranchProductsService.listOffline({
        branch_id: params === null || params === void 0 ? void 0 : params.branchId,
        identifier: params === null || params === void 0 ? void 0 : params.identifier,
        is_shown_in_scale_list: params === null || params === void 0 ? void 0 : params.isShownInScaleList,
        is_sold_in_branch: params === null || params === void 0 ? void 0 : params.isSoldInBranch,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        search: params === null || params === void 0 ? void 0 : params.search,
        unit_of_measurement: params === null || params === void 0 ? void 0 : params.unitOfMeasurement,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
exports.useBranchProductsOffline = useBranchProductsOffline;
