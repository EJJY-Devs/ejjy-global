"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBackOrdersCreate = exports.useBackOrderRetrieve = void 0;
const react_query_1 = require("react-query");
const globals_1 = require("../globals");
const services_1 = require("../services");
const helper_1 = require("./helper");
const useBackOrders = (data = {}) => {
    const { params, options } = data;
    return (0, react_query_1.useQuery)(['useBackOrders', params], () => (0, helper_1.wrapServiceWithCatch)(services_1.BackOrdersService.list({
        page: (params === null || params === void 0 ? void 0 : params.page) || globals_1.DEFAULT_PAGE,
        page_size: (params === null || params === void 0 ? void 0 : params.pageSize) || globals_1.DEFAULT_PAGE_SIZE,
        transaction_id: params === null || params === void 0 ? void 0 : params.transactionId,
        type: params === null || params === void 0 ? void 0 : params.type,
    })), Object.assign({ placeholderData: {
            results: [],
            count: 0,
        }, select: (query) => ({
            list: query.results,
            total: query.count,
        }) }, options));
};
const useBackOrderRetrieve = (data) => {
    const { id, options, serviceOptions } = data;
    return (0, react_query_1.useQuery)(['useBackOrderRetrieve', id], () => (0, helper_1.wrapServiceWithCatch)(services_1.BackOrdersService.retrieve(id, serviceOptions === null || serviceOptions === void 0 ? void 0 : serviceOptions.baseURL)), Object.assign({ enabled: typeof id === 'number' }, options));
};
exports.useBackOrderRetrieve = useBackOrderRetrieve;
const useBackOrdersCreate = () => (0, react_query_1.useMutation)(({ senderId, encodedById, transactionId, products, type }) => services_1.BackOrdersService.create({
    sender_id: senderId,
    encoded_by_id: encodedById,
    transaction_id: transactionId,
    products,
    type,
}));
exports.useBackOrdersCreate = useBackOrdersCreate;
exports.default = useBackOrders;
