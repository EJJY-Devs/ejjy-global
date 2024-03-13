"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useXReadReportCreate = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useXReadReports = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useXReadReports', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.XReadReportsService.list({
        branch_machine_id: params === null || params === void 0 ? void 0 : params.branchMachineId,
        is_with_daily_sales_data: params === null || params === void 0 ? void 0 : params.isWithDailySalesData,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        time_range: params === null || params === void 0 ? void 0 : params.timeRange,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useXReadReportCreate = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)(({ branchMachineId, date, userId }) => services_1.XReadReportsService.create({
        branch_machine_id: branchMachineId,
        date,
        user_id: userId,
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries('useXReadReports');
        },
    });
};
exports.useXReadReportCreate = useXReadReportCreate;
exports.default = useXReadReports;
