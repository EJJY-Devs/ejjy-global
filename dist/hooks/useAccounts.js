"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAccountRetrieve = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useAccounts = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)([
        'useAccounts',
        params === null || params === void 0 ? void 0 : params.accountCode,
        params === null || params === void 0 ? void 0 : params.pageSize,
        params === null || params === void 0 ? void 0 : params.page,
        params === null || params === void 0 ? void 0 : params.search,
        params === null || params === void 0 ? void 0 : params.type,
        params === null || params === void 0 ? void 0 : params.withCreditRegistration,
        params === null || params === void 0 ? void 0 : params.withSupplierRegistration,
    ], () => (0, helper_1.wrapServiceWithCatch)(services_1.AccountsService.list({
        account_code: params === null || params === void 0 ? void 0 : params.accountCode,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        search: params === null || params === void 0 ? void 0 : params.search,
        type: params === null || params === void 0 ? void 0 : params.type,
        with_credit_registration: params === null || params === void 0 ? void 0 : params.withCreditRegistration,
        with_supplier_registration: params === null || params === void 0 ? void 0 : params.withSupplierRegistration,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.type)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useAccountRetrieve = (data) => {
    const { id, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useAccountRetrieve', id], () => (0, helper_1.wrapServiceWithCatch)(services_1.AccountsService.retrieve(id, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ enabled: typeof id === 'number' }, options));
};
exports.useAccountRetrieve = useAccountRetrieve;
exports.default = useAccounts;
