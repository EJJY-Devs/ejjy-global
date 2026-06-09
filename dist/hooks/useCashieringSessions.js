"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCashieringSessionEnd = exports.useCashieringSessionStart = exports.useCashieringSessionValidate = exports.useCashieringSessionRetrieve = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useCashieringSessions = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useCashieringSessions', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.CashieringSessionsService.list({
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
const useCashieringSessionRetrieve = (data) => {
    const { id, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useCashieringSessionRetrieve'], () => (0, helper_1.wrapServiceWithCatch)(services_1.CashieringSessionsService.retrieve(id, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ enabled: typeof id === 'number' }, options));
};
exports.useCashieringSessionRetrieve = useCashieringSessionRetrieve;
const useCashieringSessionValidate = (options) => (0, react_query_1.useMutation)((id) => services_1.CashieringSessionsService.validate(id), options);
exports.useCashieringSessionValidate = useCashieringSessionValidate;
const useCashieringSessionStart = (options) => (0, react_query_1.useMutation)(({ branchMachineId, branchMachineRegistrationCount, login, password, pin }) => services_1.CashieringSessionsService.start({
    branch_machine_id: branchMachineId,
    branch_machine_registration_count: branchMachineRegistrationCount,
    login,
    password,
    pin,
}), options);
exports.useCashieringSessionStart = useCashieringSessionStart;
const useCashieringSessionEnd = (options) => (0, react_query_1.useMutation)(({ id, branchMachineId, isAutomaticallyClosed }) => services_1.CashieringSessionsService.end({
    id,
    branch_machine_id: branchMachineId,
    is_automatically_closed: isAutomaticallyClosed,
}), options);
exports.useCashieringSessionEnd = useCashieringSessionEnd;
exports.default = useCashieringSessions;
