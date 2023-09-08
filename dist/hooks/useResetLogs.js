"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useResetLogs = ({ params, options } = {}) => (0, react_query_1.useQuery)(['useResetLogs', params === null || params === void 0 ? void 0 : params.page, params === null || params === void 0 ? void 0 : params.pageSize], () => (0, helper_1.wrapServiceWithCatch)(services_1.ResetLogsService.list({
    page: (params === null || params === void 0 ? void 0 : params.page) || ejjy_global_1.DEFAULT_PAGE,
    page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || ejjy_global_1.DEFAULT_PAGE_SIZE,
})), Object.assign({ initialData: { data: { results: [], count: 0 } }, select: (query) => ({
        resetLogs: query.data.results,
        total: query.data.count,
    }) }, options));
exports.default = useResetLogs;
