"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSalesTrackerReset = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useSalesTrackers = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useSalesTracker', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.SalesTrackerService.list({
        branch_machine_id: params === null || params === void 0 ? void 0 : params.branchMachineId,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useSalesTrackerReset = () => (0, react_query_1.useMutation)(({ branchMachineId }) => services_1.SalesTrackerService.reset({
    branch_machine_id: branchMachineId,
}));
exports.useSalesTrackerReset = useSalesTrackerReset;
exports.default = useSalesTrackers;
