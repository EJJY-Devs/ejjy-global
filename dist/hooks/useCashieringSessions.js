"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCashieringSessionEnd = exports.useCashieringSessionStart = exports.useCashieringSessionValidate = exports.useCashieringSessionRetrieve = void 0;
const sessions_1 = require("ducks/sessions");
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const useActionDispatch_1 = require("hooks/useActionDispatch");
const react_query_1 = require("react-query");
const services_1 = require("services");
const useCashieringSessions = (data = {}) => {
    const { params, options } = data;
    return (0, react_query_1.useQuery)([
        'useCashieringSessions',
        params === null || params === void 0 ? void 0 : params.page,
        params === null || params === void 0 ? void 0 : params.pageSize,
        params === null || params === void 0 ? void 0 : params.timeRange,
    ], () => (0, helper_1.wrapServiceWithCatch)(services_1.CashieringSessionsService.list({
        page: (params === null || params === void 0 ? void 0 : params.page) || ejjy_global_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || ejjy_global_1.DEFAULT_PAGE_SIZE,
        time_range: params === null || params === void 0 ? void 0 : params.timeRange,
    })), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useCashieringSessionRetrieve = (data) => {
    const { id, options } = data;
    return (0, react_query_1.useQuery)(['useCashieringSessionRetrieve'], () => (0, helper_1.wrapServiceWithCatch)(services_1.CashieringSessionsService.retrieve(id)), options);
};
exports.useCashieringSessionRetrieve = useCashieringSessionRetrieve;
const useCashieringSessionValidate = ({ options } = {}) => (0, react_query_1.useMutation)((id) => services_1.CashieringSessionsService.validate(id), options);
exports.useCashieringSessionValidate = useCashieringSessionValidate;
const useCashieringSessionStart = () => {
    const saveSession = (0, useActionDispatch_1.useActionDispatch)(sessions_1.actions.save);
    return (0, react_query_1.useMutation)(({ branchMachineId, branchMachineRegistrationCount, login, password }) => services_1.CashieringSessionsService.start({
        branch_machine_id: branchMachineId,
        branch_machine_registration_count: branchMachineRegistrationCount,
        login,
        password,
    }), {
        onSuccess: ({ data }) => __awaiter(void 0, void 0, void 0, function* () {
            const { data: siteSettings } = yield services_1.SiteSettingsService.get();
            saveSession(Object.assign(Object.assign({}, data), { siteSettings }));
        }),
    });
};
exports.useCashieringSessionStart = useCashieringSessionStart;
const useCashieringSessionEnd = () => {
    const clearSession = (0, useActionDispatch_1.useActionDispatch)(sessions_1.actions.clear);
    return (0, react_query_1.useMutation)(({ id, branchMachineId, isAutomaticallyClosed }) => services_1.CashieringSessionsService.end(id, {
        branch_machine_id: branchMachineId,
        is_automatically_closed: isAutomaticallyClosed,
    }), {
        onSuccess: clearSession,
    });
};
exports.useCashieringSessionEnd = useCashieringSessionEnd;
exports.default = useCashieringSessions;
