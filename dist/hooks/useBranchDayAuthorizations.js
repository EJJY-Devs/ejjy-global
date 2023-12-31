"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("react-query");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useBranchDayAuthorizations = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useBranchDayAuthorizations', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.BranchDayAuthorizationsService.list({
        branch_id: params === null || params === void 0 ? void 0 : params.branchId,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
exports.default = useBranchDayAuthorizations;
