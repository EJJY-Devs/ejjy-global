"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAttendanceLogCreate = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useAttendanceLogs = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useAttendanceLogs', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.AttendanceLogsService.list({
        attendance_category: params === null || params === void 0 ? void 0 : params.attendanceCategory,
        attendance_type: params === null || params === void 0 ? void 0 : params.attendanceType,
        branch_id: params === null || params === void 0 ? void 0 : params.branchId,
        employee_id: params === null || params === void 0 ? void 0 : params.employeeId,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        time_range: params === null || params === void 0 ? void 0 : params.timeRange,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useAttendanceLogCreate = () => (0, react_query_1.useMutation)(({ accountCode, attendanceCategory, branchId }) => services_1.AttendanceLogsService.create({
    account_code: accountCode,
    attendance_category: attendanceCategory,
    branch_id: branchId,
}));
exports.useAttendanceLogCreate = useAttendanceLogCreate;
exports.default = useAttendanceLogs;
