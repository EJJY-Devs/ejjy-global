"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSalesTrackerReset = void 0;
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useSalesTrackers = ({ params, options }) => (0, react_query_1.useQuery)([
    'useSalesTracker',
    params === null || params === void 0 ? void 0 : params.branchMachineId,
    params === null || params === void 0 ? void 0 : params.page,
    params === null || params === void 0 ? void 0 : params.pageSize,
], () => (0, helper_1.wrapServiceWithCatch)(services_1.SalesTrackerService.list({
    branch_machine_id: params === null || params === void 0 ? void 0 : params.branchMachineId,
    page: (params === null || params === void 0 ? void 0 : params.page) || ejjy_global_1.DEFAULT_PAGE,
    page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || ejjy_global_1.DEFAULT_PAGE_SIZE,
})), Object.assign({ initialData: { data: { results: [], count: 0 } }, select: (query) => ({
        salesTrackers: query.data.results,
        total: query.data.count,
    }) }, options));
const useSalesTrackerReset = () => (0, react_query_1.useMutation)(({ branchMachineId }) => services_1.SalesTrackerService.reset({
    branch_machine_id: branchMachineId,
}));
exports.useSalesTrackerReset = useSalesTrackerReset;
exports.default = useSalesTrackers;
