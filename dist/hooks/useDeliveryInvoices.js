"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeliveryInvoiceCreate = exports.useDeliveryInvoiceRetrieve = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useDeliveryInvoices = (data = {}) => {
    const { params, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)([
        'useDeliveryInvoices',
        params === null || params === void 0 ? void 0 : params.page,
        params === null || params === void 0 ? void 0 : params.pageSize,
        params === null || params === void 0 ? void 0 : params.branchMachineId,
        params === null || params === void 0 ? void 0 : params.timeRange,
    ], () => (0, helper_1.wrapServiceWithCatch)(services_1.DeliveryInvoiceService.list({
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        branch_machine_id: params === null || params === void 0 ? void 0 : params.branchMachineId,
        time_range: (params === null || params === void 0 ? void 0 : params.timeRange) || globals_1.timeRangeTypes.DAILY,
    }, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useDeliveryInvoiceRetrieve = (data) => {
    const { id, options, serviceOptions } = data;
    const idType = typeof id;
    return (0, react_query_1.useQuery)(['useDeliveryInvoiceRetrieve', id], () => services_1.DeliveryInvoiceService.retrieve(id, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL), Object.assign({ enabled: idType === 'number' || idType === 'string' }, options));
};
exports.useDeliveryInvoiceRetrieve = useDeliveryInvoiceRetrieve;
const useDeliveryInvoiceCreate = (data) => (0, react_query_1.useMutation)((body) => services_1.DeliveryInvoiceService.create(body), data === null || data === void 0 ? void 0 : data.options);
exports.useDeliveryInvoiceCreate = useDeliveryInvoiceCreate;
exports.default = useDeliveryInvoices;
