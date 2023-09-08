"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useUserLogs = ({ params }) => (0, react_query_1.useQuery)([
    'useUserLogs',
    params === null || params === void 0 ? void 0 : params.actingUserId,
    params === null || params === void 0 ? void 0 : params.page,
    params === null || params === void 0 ? void 0 : params.pageSize,
    params === null || params === void 0 ? void 0 : params.timeRange,
    params === null || params === void 0 ? void 0 : params.type,
], () => (0, helper_1.wrapServiceWithCatch)(services_1.UserLogsService.list({
    acting_user_id: params === null || params === void 0 ? void 0 : params.actingUserId,
    page: (params === null || params === void 0 ? void 0 : params.page) || ejjy_global_1.DEFAULT_PAGE,
    page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || ejjy_global_1.DEFAULT_PAGE_SIZE,
    time_range: params === null || params === void 0 ? void 0 : params.timeRange,
    type: params === null || params === void 0 ? void 0 : params.type,
})), {
    initialData: { data: { results: [], count: 0 } },
    select: (query) => ({
        userLogs: query.data.results,
        total: query.data.count,
    }),
});
exports.default = useUserLogs;
