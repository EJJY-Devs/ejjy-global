"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useUserLogs = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useUserLogs', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.UserLogsService.list({
        acting_user_id: params === null || params === void 0 ? void 0 : params.actingUserId,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        time_range: params === null || params === void 0 ? void 0 : params.timeRange,
        type: params === null || params === void 0 ? void 0 : params.type,
    })), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
exports.default = useUserLogs;
